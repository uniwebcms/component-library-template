import React from 'react';
import { Image, Profile } from '@uniwebcms/module-sdk';

const ResultItem = (props) => {
    const {
        website,
        title,
        description,
        href,
        route,
        banner,
        avatar,
        contentType,
        contentId,
    } = props;

    const imgType = banner ? 'banner' : avatar ? 'avatar' : '';
    const version = banner || avatar || '';

    const { Link } = website.getRoutingComponents();

    const profile = Profile.newProfile(
        contentType || 'website',
        contentId || website.getSiteId(),
        {
            head: {
                [`_${imgType}`]: version,
            },
        }
    );

    return (
        <Link to={route} className={`px-9 py-5 flex h-[150px] border-b group`}>
            <div className={`flex flex-col overflow-hidden`}>
                <span
                    className={`text-lg truncate text-[#1a0dab] group-hover:underline`}
                >
                    {title}
                </span>
                <span
                    className={`text-base leading-[1.2] truncate text-[#006621]`}
                >
                    {href}
                </span>
                <span
                    className={`text-sm mt-1.5 leading-[18px] line-clamp-3 text-[#444]`}
                >
                    {description}
                </span>
            </div>
            {imgType && version ? (
                <div className={`w-[110px] flex-shrink-0 ml-4`}>
                    <Image profile={profile} type={imgType}></Image>
                </div>
            ) : null}
        </Link>
    );
};

export default ResultItem;
