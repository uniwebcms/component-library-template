import React, { useState } from 'react';
import ScrollspyNav from '../_utils/ScrollNav';
import { CgMenuLeftAlt } from 'react-icons/cg';
import { stripTags } from '@uniwebcms/module-sdk';

const findScrollContainer = (element) => {
    if (!element) {
        return undefined;
    }

    let parent = element.parentElement;
    while (parent) {
        const { overflow } = window.getComputedStyle(parent);
        if (overflow.split(' ').every((o) => o === 'auto' || o === 'scroll')) {
            return parent;
        }
        parent = parent.parentElement;
    }

    return document.documentElement;
};

export default (props) => {
    const sidebarStyle = 'max-h-[calc(100vh-88px)] max-w-[220px] flex-1';

    const liStyle = 'hover:underline line-clamp-1 [&_a.is-active]:text-[#0d8287]';

    const { website, page } = props;

    const cards = page.childBlocks?.filter((item) => !item.targetElement);
    const ids = cards.map((item) => `Section${item.id}`);

    const borderStyle = 'border-l-[1px] border-rgba(211,220,228,1.00)';

    const [scroller, setScroller] = useState(null);

    return (
        <div className={`w-[220px] xl:w-[280px]`}>
            <div
                ref={(ref) => {
                    if (ref && !scroller) {
                        setScroller(findScrollContainer(ref));
                    }
                }}
                className={`block ${sidebarStyle} hidden md:fixed md:!block flex-shrink-0 self-start top-[80px] overflow-auto`}>
                {ids.length ? (
                    <div className={`px-6 ${borderStyle} my-6`}>
                        <div className={`flex items-center mb-4 text-sm text-gray-500`}>
                            <CgMenuLeftAlt className={`w-5 h-5 mr-2`}></CgMenuLeftAlt>
                            <h3 className={`uppercase`}>
                                {website.localize({
                                    en: 'outline',
                                    fr: 'sommaire'
                                })}
                            </h3>
                        </div>
                        {scroller ? (
                            <ScrollspyNav scrollTargetIds={[...ids]} offset={-10} activeNavClass='is-active' scrollDuration='400' scroller={scroller}>
                                {cards.map((item, i) => {
                                    const { mainTitle, id, main, mainHeader } = item;
                                    const headings = main?.body?.headings || [];

                                    return (
                                        <ul className={`mb-4 capitalize`} key={i}>
                                            <li>
                                                <a className={`text-base font-medium text-gray-600 hover:text-gray-800 ${liStyle}`} href={`#Section${id}`}>
                                                    {mainTitle}
                                                </a>
                                                {headings.length ? (
                                                    <ul className={`ml-2 space-y-1.5 mt-1`}>
                                                        {headings.map((heading, hi) => {
                                                            return (
                                                                <li key={hi}>
                                                                    <a className={`text-sm text-gray-500 hover:text-gray-700 ${liStyle}`} href={`#Section${id}-${stripTags(heading).replace(/\s/g, '-')}`}>
                                                                        {heading}
                                                                    </a>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                ) : null}
                                            </li>
                                        </ul>
                                    );
                                })}
                            </ScrollspyNav>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </div>
    );
};
