import styles from './Section.module.scss';
import React from 'react';
import Render from './Render';
import { buildArticleBlocks } from './parser';

export default function (props) {
    const { website, block } = props;
    const { content } = block;

    if (!content || !Object.keys(content).length) return null;

    const parsedContent = buildArticleBlocks(website.parseLinksInArticle(content));

    return (
        <div className={`bg-white max-w-full relative flex flex-col`}>
            <div className={`mx-auto w-full` + ` ${styles.SectionWrapper}`}>
                <Render {...props} content={parsedContent}></Render>
            </div>
        </div>
    );
}
