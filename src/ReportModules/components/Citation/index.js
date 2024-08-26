import React, { useEffect, useRef, useCallback, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { parseBlockContent, htmlToDocx, Paragraph, Section, TextRun } from '@uniwebcms/report-sdk';

function parseHTMLForClass(htmlString, className) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    function parseNodeForClass(node, className) {
        const result = [];

        if (node.classList && node.classList.contains(className)) {
            // Remove outer wrapper tag
            const contentWithoutWrapper = node.innerHTML;

            // Convert <i> tag to <em>
            const contentWithoutITag = contentWithoutWrapper.replace(/<i>/g, '<em>').replace(/<\/i>/g, '</em>');

            // Remove empty space by split by HTML tags while keeping the tags with their inner content, and then join them back
            const splitContent = contentWithoutITag
                .split(/(<[^>]+>[^<]*<\/[^>]+>|<[^>]+>)/g)
                .filter(Boolean)
                .map((content) => content.trim());

            result.push(splitContent.join(''));
        } else {
            for (const childNode of node.childNodes) {
                result.push(...parseNodeForClass(childNode, className));
            }
        }

        return result;
    }

    return parseNodeForClass(doc.body.firstChild, className);
}

const filterCitationData = (htmlString, start_date, end_date, sort_by) => {
    function extractCitations(htmlString) {
        // Create a DOM parser
        const parser = new DOMParser();
        // Parse the HTML string
        const doc = parser.parseFromString(htmlString, 'text/html');
        // Get the u-cite tag
        const uCiteElement = doc.querySelector('u-cite');

        if (!uCiteElement) {
            return { citations: [], attributes: {} };
        }

        // Get the content of the u-cite tag
        const uCiteContent = uCiteElement.textContent;
        // Parse the JSON content
        const citations = JSON.parse(uCiteContent);
        // Extract the properties of the u-cite tag
        const attributes = Array.from(uCiteElement.attributes).reduce((attrs, attr) => {
            attrs[attr.name] = attr.value;
            return attrs;
        }, {});
        return { citations, attributes };
    }

    // Function to convert filtered array back to HTML string
    function convertArrayToHtmlString(filteredArray, attributes) {
        // Convert the filtered array to a JSON string
        const jsonString = JSON.stringify(filteredArray, null, 2);
        // Create the attribute string
        const attributeString = Object.entries(attributes)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');
        // Wrap the JSON string in the <u-cite> tag with the preserved attributes
        const htmlString = `<u-cite ${attributeString}>${jsonString}</u-cite>`;
        return htmlString;
    }

    // function to parse a date value with year/month/day formate
    function parseDate(dateString) {
        if (!dateString) return null;
        const parts = dateString.split('/').map(Number);
        const year = parts[0];
        const month = parts[1] ? parts[1] : 1;
        const day = parts[2] ? parts[2] : 1;
        return new Date(year, month - 1, day);
    }

    // function to parse a citation item date value with [year, month, day] formate
    function parseCitationDate(dateParts) {
        const year = dateParts[0];
        const month = dateParts[1] ? dateParts[1] : 1;
        const day = dateParts[2] ? dateParts[2] : 1;
        return new Date(year, month - 1, day);
    }

    // function to filter the citations array based on the date range
    function inRange(citation, start_date, end_date) {
        const citationDate = parseCitationDate(citation.issued['date-parts'][0]);

        const startDate = parseDate(start_date);
        const endDate = parseDate(end_date);

        if (!startDate && !endDate) return true;
        if (startDate && !endDate) return citationDate >= startDate;
        if (!startDate && endDate) return citationDate <= endDate;
        return citationDate >= startDate && citationDate <= endDate;
    }

    // Get the citations array
    const { citations, attributes } = extractCitations(htmlString);

    /// filer the citations array based on the date range
    const filteredCitations = citations.filter((citation) => inRange(citation, start_date, end_date));

    // Apply date filtering
    if (sort_by && sort_by !== 'none') {
        if (sort_by === 'date') {
            filteredCitations.sort((a, b) => {
                const citationDateA = parseCitationDate(a.issued['date-parts'][0]);
                const citationDateB = parseCitationDate(b.issued['date-parts'][0]);
                return citationDateA - citationDateB; // Sort by date in ascending order
            });
        } else if (sort_by === 'date_reverse') {
            filteredCitations.sort((a, b) => {
                const citationDateA = parseCitationDate(a.issued['date-parts'][0]);
                const citationDateB = parseCitationDate(b.issued['date-parts'][0]);
                return citationDateB - citationDateA; // Sort by date in descending order
            });
        }
    }

    const newHtmlString = convertArrayToHtmlString(filteredCitations, attributes);

    return newHtmlString;
};

export default function (props) {
    const { website, block } = props;
    const { SafeHtml } = website.getRoutingComponents();
    const { start_date, end_date } = website.reportDownloadOptions;
    const { sort_by = 'none' } = block.getBlockProperties();
    const { title, subtitle, description, paragraphs } = parseBlockContent(block);
    const mainTitle = title || subtitle || description || '';

    const ref = useRef(null);
    const [markup, setMarkup] = useState(null);

    const filteredCitationData = useCallback(() => {
        return filterCitationData(paragraphs[0], start_date, end_date, sort_by);
    }, [paragraphs, start_date, end_date, sort_by]);

    useEffect(() => {
        setMarkup(null);
    }, [start_date, end_date, sort_by]);

    const generateMarkup = useCallback(
        (parsedHTML) => {
            return (
                <>
                    <Paragraph data={mainTitle} className='pt-4 pb-2' data-heading='HEADING_4'></Paragraph>
                    {sort_by !== 'date_reverse' ? (
                        <ol data-type='contentWrapper' className='list-decimal'>
                            {parsedHTML.map((entry, index) => (
                                <Paragraph as='li' className='ml-12 pl-8' key={index} data={entry} data-numbering-reference='numbering' data-numbering-level='0' data-numbering-instance={Number(block.id)}></Paragraph>
                            ))}
                        </ol>
                    ) : (
                        <div data-type='contentWrapper' className=''>
                            {parsedHTML.map((entry, index) => (
                                <Paragraph key={index} data={entry} format={{ mode: 'ordered-list-reversed', numberingNumber: parsedHTML.length - index }}></Paragraph>
                            ))}
                        </div>
                    )}
                    <Paragraph>
                        <TextRun></TextRun>
                        <span data-type='emptyLine' className='invisible'>
                            EmptyLine
                        </span>
                    </Paragraph>
                </>
            );
        },
        [mainTitle, block.id, sort_by]
    );

    useEffect(() => {
        if (ref.current && !markup) {
            const parseAndSet = () => {
                if (ref.current) {
                    const parsedHTML = parseHTMLForClass(ref.current.innerHTML, 'csl-entry');
                    const newMarkup = generateMarkup(parsedHTML);
                    setMarkup(newMarkup);
                }
            };

            const observer = new MutationObserver(() => {
                parseAndSet();
            });

            observer.observe(ref.current, { childList: true, subtree: true });

            // Initial action if content is already available
            if (ref.current.innerHTML.trim() !== '<div></div>') {
                parseAndSet();
            }

            return () => observer.disconnect();
        }
    }, [ref, markup, generateMarkup]);

    useEffect(() => {
        if (markup) {
            const htmlString = ReactDOMServer.renderToStaticMarkup(markup);
            const docx = htmlToDocx(htmlString);
            block.docx = docx;
        }
    }, [markup, block]);

    return (
        <Section className='relative'>
            <div ref={ref} className='absolute invisible'>
                <SafeHtml value={filteredCitationData()} />
            </div>
            {markup}
        </Section>
    );
}
