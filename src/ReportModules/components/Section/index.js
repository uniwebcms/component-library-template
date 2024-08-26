import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { parseBlockContent, htmlToDocx, Paragraphs, Section, H1, H2, H3, H4, Images, Links, Lists } from '@uniwebcms/report-sdk';

export default function (props) {
    const { block } = props;
    const { content, childBlocks } = block;

    const hasContent = content && Object.keys(content).length > 0;

    if (!hasContent && !childBlocks.length) return null;

    let markup = null,
        children = null;

    if (hasContent) {
        const parsedBlockContent = parseBlockContent(block);

        const { pretitle, title, subtitle, description, paragraphs, images, links, lists, tables, items } = parsedBlockContent;

        const html = (
            <>
                <H1 data={pretitle}></H1>
                <H2 data={title}></H2>
                <H3 data={subtitle}></H3>
                <H4 data={description}></H4>
                <Paragraphs data={paragraphs}></Paragraphs>
                <Images data={images}></Images>
                <Links data={links}></Links>
                <Lists data={lists}></Lists>
            </>
        );

        const htmlString = ReactDOMServer.renderToStaticMarkup(html);

        const docx = htmlToDocx(htmlString);

        block.docx = docx;

        markup = <Section>{html}</Section>;
    }

    if (childBlocks.length) {
        const ChildBlockRenderer = block.getChildBlockRenderer();

        children = <ChildBlockRenderer block={block} childBlocks={childBlocks} as='div'></ChildBlockRenderer>;
    }

    return (
        <>
            {markup}
            {children}
        </>
    );
}
