import React, { useState } from 'react';
import styles from '../../Section.module.scss';
import { Image } from '@uniwebcms/module-sdk';

const imageCaptionStyle = `block outline-none border-none text-gray-500 text-sm ${styles.ImageCaption}}`;

export default function ImageBlock(props) {
    const { url, caption, direction, filter, info, targetId, aspect_ratio, page } = props;

    if (targetId) info.contentId = targetId;

    let { width, height, ratio } = aspect_ratio;

    let maxWidth = 'none',
        maxHeight,
        body;

    const [imgRatio] = useState(aspect_ratio);

    const keys = ['blur', 'brightness', 'contrast', 'grayscale'];

    let filterStyle = [];

    keys.forEach((key) => {
        let val = filter && filter[key] ? filter[key] : '';

        if (val) {
            filterStyle.push(`${key}(${val})`);
        }
    });

    let imgFilter = '';

    if (filterStyle.length) {
        imgFilter = `[&_img]:`;
    }

    const { version, filename, contentId, identifier } = info;

    let imgProps =
        version && identifier && filename ? { value: `${version}/${identifier}/${filename}` } : { externalSrc: url };

    const inner = (
        <>
            <div
                className={`relative w-full mx-auto block`}
                style={{
                    maxHeight,
                    maxWidth
                }}>
                <div
                    className='aspect-ratio-fill'
                    style={{
                        paddingBottom: imgRatio?.pb || `${imgRatio.ratio}%`
                    }}
                />
                <Image
                    profile={page.getPageProfile()}
                    {...imgProps}
                    className={`absolute top-0 left-0 w-full h-auto block ${imgFilter}`}></Image>
            </div>

            <figcaption className={`text-center! mt-2.5 tracking-normal text-sm outline-none z-50`}>
                {caption ? <div className={`${imageCaptionStyle}`}>{caption}</div> : null}
            </figcaption>
        </>
    );

    if (direction === 'small') {
        body = (
            <figure className={`relative clear-both outline-none z-10 mt-10 mx-auto`}>
                <div
                    className={`relative w-full mx-auto flex justify-center ${imgFilter}`}
                    style={{
                        maxWidth: '896px'
                    }}>
                    {/* <DocumentImage
                        contentId={contentId}
                        value={`${version}/${identifier}/${filename}`}
                        className={`block max-h-[120px] w-auto`}
                    ></DocumentImage> */}
                    <Image
                        profile={page.getPageProfile()}
                        {...imgProps}
                        className={`block max-h-[120px] w-auto`}></Image>
                </div>

                <figcaption className={`text-center! mt-2.5 tracking-normal text-sm outline-none z-50`}>
                    {caption ? <div className={`${imageCaptionStyle}`}>{caption}</div> : null}
                </figcaption>
            </figure>
        );
    } else if (direction === 'left' || direction === 'right') {
        maxWidth = 525;
        maxHeight = (maxWidth * ratio) / 100;

        maxWidth = `${maxWidth}px`;
        maxHeight = `${maxHeight}px`;

        const marginStyle = direction === 'left' ? 'ml-[-150px] mr-[30px]' : 'mr-[-150px] ml-[30px]';

        body = (
            <figure
                className={`relative clear-both outline-none z-10 mt-8 mx-auto`}
                style={{
                    maxWidth: '896px'
                }}>
                <div
                    className={`md:w-3/4  ${
                        direction === 'left' ? 'fload-left' : 'float-right'
                    } relative mb-6 ${marginStyle}`}>
                    {inner}
                </div>
            </figure>
        );
    } else {
        if (direction === 'fill') {
            maxWidth = 'none';
            maxHeight = 'none';
        } else {
            if (direction === 'center') {
                maxWidth = 896;
            } else if (direction === 'wide') {
                maxWidth = 1280;
            }

            maxHeight = (maxWidth * ratio) / 100;
            maxHeight = `${maxHeight}px`;
            maxWidth = `${maxWidth}px`;
        }

        body = (
            <figure
                className={`relative clear-both outline-none z-10 mt-10 mx-auto`}
                style={{
                    maxWidth,
                    maxHeight
                }}>
                {inner}
            </figure>
        );
    }

    return body;
}
