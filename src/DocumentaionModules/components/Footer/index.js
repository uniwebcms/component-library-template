import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';
import { Link } from '@uniwebcms/module-sdk';
import * as React from 'react';

export default function (props) {
    const { website, page } = props;

    const activeRoute = page.getRoute();
    const activePath = page.options.pathname;

    const flatDocs = website.getPageHierarchy({
        nested: false,
        pageOnly: true
    });

    let activeIndex = flatDocs.findIndex((item, i) => {
        return item.route === activeRoute || (i === 0 && !activePath);
    });

    let pre = activeIndex === 0 ? null : flatDocs[activeIndex - 1];
    let next = activeIndex === flatDocs.length - 1 ? null : flatDocs[activeIndex + 1];

    const btn = 'flex-1 cursor-pointer flex items-center p-4 border rounded text-sm hover:shadow-lg group';

    return (
        <div className={`flex flex-col md:flex-row w-full pt-16 pb-16 px-4 md:px-0`}>
            {pre ? (
                <Link className={`mb-4 md:mr-2 md:mb-0 ${btn}`} to={pre.route}>
                    <HiArrowNarrowLeft className={`w-5 h-5 mr-4 flex-shrink-0 text-gray-400 group-hover:text-blue-500`}></HiArrowNarrowLeft>
                    <div className={`flex flex-col items-start flex-grow`}>
                        <span className={`text-gray-400`}>
                            {website.localize({
                                en: 'Previous',
                                fr: 'Précédente'
                            })}
                        </span>
                        <span className={`truncate font-medium group-hover:text-blue-500`}>{pre.label}</span>
                    </div>
                </Link>
            ) : null}
            {next ? (
                <Link className={`md:ml-2 ${btn}`} to={next.route}>
                    <div className={`flex flex-col items-start flex-grow`}>
                        <span className={`text-gray-400`}>{website.localize({ en: 'Next', fr: 'Suivant' })}</span>
                        <span className={`truncate font-medium group-hover:text-blue-500}`}>{next.label}</span>
                    </div>
                    <HiArrowNarrowRight className={`w-5 h-5 ml-4 flex-shrink-0 text-gray-400 group-hover:text-blue-500}`}></HiArrowNarrowRight>
                </Link>
            ) : null}
        </div>
    );
}
