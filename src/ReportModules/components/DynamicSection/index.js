import React, { Fragment } from 'react';
import ReactDOMServer from 'react-dom/server';
import { parseBlockContent, mergeListParagraphs, htmlToDocx, Paragraph, Paragraphs, Section, TextRun, H1, H2, H3, H4, Images, Links, Lists } from '@uniwebcms/report-sdk';

const emptyLine = (
    <Paragraph>
        <TextRun></TextRun>
        <span data-type='emptyLine' className='invisible'>
            EmptyLine
        </span>
    </Paragraph>
);

function toCamelCase(str) {
    return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}

const getGenericHtml = (content, ...extra) => {
    const { pretitle, title, subtitle, description, paragraphs, images, links, lists } = content;

    return (
        <>
            <H1 data={pretitle}></H1>
            <H2 data={title}></H2>
            <H3 data={subtitle}></H3>
            <H4 data={description}></H4>
            <Paragraphs data={paragraphs}></Paragraphs>
            <Images data={images}></Images>
            <Links data={links}></Links>
            <Lists data={lists}></Lists>
            {extra.map((item, index) => (
                <Fragment key={index}>{item}</Fragment>
            ))}
        </>
    );
};

function isEmptyHTML(htmlString) {
    // Create a new DOM parser
    const parser = new DOMParser();
    // Parse the HTML string into a document
    const doc = parser.parseFromString(htmlString, 'text/html');
    // Get the text content of the document
    const textContent = doc.body.textContent || '';
    // Check if the text content is empty
    return textContent.trim() === '';
}

const getFormattedBlockMarkup = (content, format, id) => {
    const { items, ...mainContent } = content;

    const mainHtml = getGenericHtml(mainContent);

    let html;

    switch (format) {
        case 'two-level-indentation': {
            const itemMarkup = items.map((item, index) => {
                let twoLvlIndentParagraph, otherContent;

                const { lists, ...content } = item;

                if (lists.length) {
                    twoLvlIndentParagraph = (
                        <>
                            {lists
                                .map((list, index) => {
                                    const data = mergeListParagraphs(list);

                                    if (!isEmptyHTML(data)) return <Paragraph key={index} data={data} format={{ mode: 'twoLevelIndentation', list: list }}></Paragraph>;
                                    return null;
                                })
                                .filter(Boolean)}
                        </>
                    );
                }

                otherContent = getGenericHtml(content);

                return (
                    <Fragment key={index}>
                        {twoLvlIndentParagraph}
                        {otherContent}
                        {index < items.length - 1 && emptyLine}
                    </Fragment>
                );
            });

            html = (
                <>
                    {mainHtml}
                    {itemMarkup}
                </>
            );

            break;
        }
        case 'two-column-layout':
        case 'two-column-layout-wide':
        case 'two-column-layout-justified': {
            const itemMarkup = items.map((item, index) => {
                let twoColLayoutParagraph, otherContent;

                const { lists, ...content } = item;
                const firstList = lists[0];

                if (firstList) {
                    twoColLayoutParagraph = <Paragraph data={mergeListParagraphs(firstList)} format={{ mode: toCamelCase(format), list: firstList }}></Paragraph>;
                }
                otherContent = getGenericHtml(content);

                return (
                    <Fragment key={index}>
                        {twoColLayoutParagraph}
                        {otherContent}
                        {index < items.length - 1 && emptyLine}
                    </Fragment>
                );
            });

            html = (
                <>
                    {mainHtml}
                    {itemMarkup}
                </>
            );

            break;
        }
        case 'ordered-list':
        case 'unordered-list': {
            const itemMarkup = items.map((item, index) => {
                const { paragraphs } = item;
                return (
                    <Fragment key={index}>
                        <Paragraphs
                            data={paragraphs}
                            dataProps={{
                                as: 'li',
                                className: 'ml-12 pl-8',
                                'data-numbering-reference': format === 'ordered-list' ? 'numbering' : 'en-dash',
                                'data-numbering-level': 0,
                                'data-numbering-instance': Number(id)
                            }}></Paragraphs>
                        {index < items.length - 1 && emptyLine}
                    </Fragment>
                );
            });

            html = (
                <>
                    {mainHtml}
                    <ol data-type='contentWrapper' className={format === 'ordered-list' ? 'list-decimal' : 'list-["–"]'}>
                        {itemMarkup}
                    </ol>
                </>
            );

            break;
        }
        case 'left-indentation': {
            const itemMarkup = items.map((item, index) => {
                const { paragraphs, images, links, lists } = item;
                return (
                    <Fragment key={index}>
                        <Paragraphs
                            data={paragraphs}
                            dataProps={{
                                className: 'pl-8',
                                'data-style': 'leftIndentation'
                            }}></Paragraphs>
                        {index < items.length - 1 && emptyLine}
                    </Fragment>
                );
            });

            html = (
                <>
                    {mainHtml}
                    {itemMarkup}
                </>
            );

            break;
        }
        case 'group-items': {
            const { title, subtitle, description } = mainContent;
            const groupTitle = title || subtitle || description || '';

            const titleMarkup = <Paragraph className='pl-8 underline' data={groupTitle} data-style='groupTitle'></Paragraph>;

            const itemMarkup = items.map((item, index) => {
                const { paragraphs } = item;

                return (
                    <Fragment key={index}>
                        <Paragraphs
                            data={paragraphs}
                            dataProps={{
                                className: 'pl-40',
                                'data-style': 'groupItems'
                            }}></Paragraphs>
                        {index < items.length - 1 && emptyLine}
                    </Fragment>
                );
            });

            html = (
                <>
                    {titleMarkup}
                    {itemMarkup}
                </>
            );

            break;
        }
        default: {
            const itemMarkup = items.map((item, index) => {
                const content = getGenericHtml(item);

                return (
                    <Fragment key={index}>
                        {content}
                        {index < items.length - 1 && emptyLine}
                    </Fragment>
                );
            });

            html = (
                <>
                    {mainHtml}
                    {itemMarkup}
                </>
            );

            break;
        }
    }

    return (
        <>
            {html}
            {emptyLine}
        </>
    );
};

export default function (props) {
    const { block } = props;
    const { id } = block;

    const { formatting = 'none' } = block.getBlockProperties();

    const blockContent = parseBlockContent(block);

    const markup = getFormattedBlockMarkup(blockContent, formatting, id);

    const htmlString = ReactDOMServer.renderToStaticMarkup(markup);

    const docx = htmlToDocx(htmlString);

    block.docx = docx;

    return <Section>{markup}</Section>;
}
