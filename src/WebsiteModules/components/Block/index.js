import React from 'react';
import { SafeHtml } from '@uniwebcms/module-sdk';

export default (props) => {
    const { block } = props;
    const { main } = block;

    const { title = '', subtitle = '', pretitle = '' } = main.header || {};
    const paragraphs = main.body?.paragraphs || [];

    return (
        <section className='flex max-w-7xl mx-auto my-20'>
            <p className='text-gray-700 font-medium'>Content of the section:</p>
            <div className='mt-12 px-6 py-4 border rounded-lg min-w-full'>
                {pretitle && <p className='text-xl font-medium'>{pretitle}</p>}
                {title && <h2 className='text-4xl font-bold mt-1'>{title}</h2>}
                {subtitle && <p className='text-lg mt-0.5'>{subtitle}</p>}
                {paragraphs.length ? <SafeHtml value={paragraphs} className='mt-4 text-gray-800' /> : null}
            </div>
        </section>
    );
};
