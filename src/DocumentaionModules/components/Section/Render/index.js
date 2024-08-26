import React from 'react';
import Divider from './Divider';
import Image from './Image';
import styles from '../Section.module.scss';
import Warning from './Warning';
import { stripTags } from '@uniwebcms/module-sdk';

const Render = function (props) {
    const { block, content, page } = props;

    const blockId = block.id;

    if (!content || !content.length) return null;

    return content.map((block, index) => {
        const { type, content } = block;

        switch (type) {
            case 'paragraph':
                return <p className={styles.Block} key={index} dangerouslySetInnerHTML={{ __html: content }}></p>;
            case 'heading':
                const { level } = block;
                const Heading = `h${level}`;

                const style = level === 1 ? `text-4xl` : level === 2 ? `text-3xl` : 'text-2xl';

                return (
                    <Heading
                        key={index}
                        id={`Section${blockId}-${stripTags(content).replace(/\s/g, '-')}`}
                        className={`${style}` + ` ${styles.Block}`}
                        dangerouslySetInnerHTML={{ __html: content }}></Heading>
                );
            case 'image':
                return <Image key={index} {...block} page={page} />;
            case 'warning':
                return <Warning key={index} {...block} />;
            case 'divider':
                return <Divider key={index} {...block} />;
            case 'orderedList':
                return (
                    <ol key={index} className={`list-decimal` + ` ${styles.Block}`}>
                        {content.map((item, i) => {
                            return (
                                <li key={i}>
                                    <Render content={item} />
                                </li>
                            );
                        })}
                    </ol>
                );
            case 'bulletList':
                return (
                    <ul key={index} className={`list-disc` + ` ${styles.Block}`}>
                        {content.map((item, i) => {
                            return (
                                <li key={i}>
                                    <Render content={item} />
                                </li>
                            );
                        })}
                    </ul>
                );
            case 'blockquote':
                return (
                    <blockquote key={index} className={styles.Block}>
                        <Render content={content} />
                    </blockquote>
                );

            case 'codeBlock':
                return (
                    <pre key={index} className={`whitespace-pre-wrap bg-[rgba(0,0,0,0.05)] p-5` + ` ${styles.Block}`}>
                        <code dangerouslySetInnerHTML={{ __html: content }}></code>
                    </pre>
                );
        }
    });
};

export default Render;
