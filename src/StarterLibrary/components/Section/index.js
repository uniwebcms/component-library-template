import React from 'react';
import { SafeHtml } from '@uniwebcms/module-sdk';

export default (props) => {
    const { block } = props;
    const { main } = block;

    const { title = '', subtitle = '', pretitle = '' } = main.header || {};
    const paragraphs = main.body?.paragraphs || [];

    const { alignment = 'left', spacing = 'medium' } = block.getBlockProperties();

    return (
        <section
            className={`flex flex-col max-w-7xl mx-auto my-12 border rounded-lg bg-bg-color ${
                alignment === 'left' && 'items-start'
            } ${alignment === 'center' && 'items-center'} ${alignment === 'right' && 'items-end'} ${
                spacing === 'small' && 'p-4'
            } ${spacing === 'medium' && 'p-8'} ${spacing === 'large' && 'p-12'}`}
        >
            <p className="text-text-color-50 font-medium italic">Content of the section:</p>
            <div
                className={`${spacing === 'small' && 'pt-4'} ${spacing === 'medium' && 'pt-8'} ${
                    spacing === 'large' && 'pt-12'
                }`}
            >
                {pretitle && <p className="text-xl font-medium">{pretitle}</p>}
                {title && <h2 className="text-2xl font-bold">{title}</h2>}
                {subtitle && <h3 className="text-lg">{subtitle}</h3>}
                {paragraphs.length ? (
                    <SafeHtml value={paragraphs} className="mt-4 text-text-color-70" />
                ) : null}
            </div>
        </section>
    );
};
