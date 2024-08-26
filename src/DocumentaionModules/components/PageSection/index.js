import React from 'react';
import { css } from '@emotion/css';

export default function (props) {
    const { block } = props;

    const { title, subtitle: description, childBlocks } = block;

    let bgColor = 'bg-white',
        textColor = 'rgb(13,67,92)',
        borderColor = 'rgb(13,130,135)',
        linkColor = 'rgb(13, 130, 135)',
        titlePosition = 'center',
        desPosition = 'center',
        titleSize = 'lg';

    const sectionStyle =
        titlePosition === 'center'
            ? css({
                  color: textColor,
                  '&:after': {
                      content: "''",
                      display: 'flex',
                      width: '10rem',
                      paddingTop: '20px',
                      textAlign: 'center',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      paddingLeft: '1rem',
                      borderBottomWidth: '4px',
                      borderBottomStyle: 'solid',
                      borderColor
                  }
              })
            : css({
                  color: textColor,
                  paddingLeft: '1rem',
                  borderLeftWidth: '4px',
                  borderLeftStyle: 'solid',
                  borderColor
              });

    const textStyle = css({
        color: textColor,
        '& a': {
            color: linkColor,
            textDecoration: 'underline'
        }
    });

    const ChildBlocksRenderer = block.getChildBlockRenderer();

    return (
        <div className={`${bgColor} pt-12`}>
            {title ? (
                <div className={`flex mt-0 mb-6 ${titlePosition === 'center' ? 'justify-center' : 'justify-start'} text-2xl ${titleSize === 'md' ? 'md:text-2xl' : 'md:text-4xl'}`}>
                    <h2 className={`${sectionStyle} font-bold text-center md:text-left`}>{title}</h2>
                </div>
            ) : null}
            {description ? (
                <div className={`flex mt-0 mb-4 justify-center text-lg ${desPosition === 'center' ? 'justify-center' : 'justify-start'}`}>
                    <div className={`${textStyle}`}>{description}</div>
                </div>
            ) : null}
            {childBlocks.length ? (
                <div className={`flex flex-col w-full pb-8 md:pb-12`}>
                    <ChildBlocksRenderer block={block}></ChildBlocksRenderer>
                </div>
            ) : null}
        </div>
    );
}
