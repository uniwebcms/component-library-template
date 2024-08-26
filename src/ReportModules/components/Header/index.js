import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { parseBlockContent, htmlToDocx, Paragraph, TextRun, Section } from '@uniwebcms/report-sdk';

export default function Header(props) {
    const { website, block } = props;

    const { paragraphs } = parseBlockContent(block);

    const { applyTo = 'all', pageNumber = false } = block.getBlockProperties();

    const markup = (
        <>
            <Paragraph className='flex'>
                {paragraphs[0] && <TextRun>{paragraphs[0]}</TextRun>}
                {pageNumber && (
                    <>
                        <TextRun className='ml-auto' data-positionaltab-alignment='right' data-positionaltab-relativeto='margin' data-positionaltab-leader='none'>
                            {website.localize({
                                en: 'Page',
                                fr: 'Page'
                            })}
                            &nbsp;
                        </TextRun>
                        <TextRun>_currentPage</TextRun>
                        <TextRun>
                            &nbsp;
                            {website.localize({
                                en: 'of',
                                fr: 'de'
                            })}
                            &nbsp;
                        </TextRun>
                        <TextRun>_totalPages</TextRun>
                    </>
                )}
            </Paragraph>
            {paragraphs[1] && (
                <Paragraph>
                    <TextRun>{paragraphs[1]}</TextRun>
                </Paragraph>
            )}
        </>
    );

    const htmlString = ReactDOMServer.renderToStaticMarkup(markup);

    const docx = htmlToDocx(htmlString);

    block.docx = { firstPageOnly: applyTo === 'first', docx };

    return <Section className='mt-12 mb-8 text-gray-500'>{markup}</Section>;
}
