import { Link } from '@uniwebcms/module-sdk';
import { HiChevronRight, HiChevronDown } from 'react-icons/hi';
import React, { useEffect, useState, useCallback } from 'react';

const includeActivePage = (child_items, activeRoute) => {
    if (!child_items) return false;

    for (let i = 0; i < child_items.length; i++) {
        const info = child_items[i];

        const { route, child_items: data } = info;

        const isActive = route === activeRoute;

        if (isActive) return true;

        if (child_items) {
            const result = includeActivePage(data, activeRoute);

            if (result) return true;
        }
    }

    return false;
};

const MenuItem = (props) => {
    const docStyle = 'w-full min-h-[32px] border-l border-t border-b flex items-center border-[transparent] text-[rgba(92,105,117,1)]';

    const { info, isFirst, website, opens, openCloseMenu } = props;

    const page = website.activePage;
    const activeRoute = page.getRoute();
    const activePath = page.options.pathname;

    const { id, label, route, child_items = null } = info;

    const isActive = route === activeRoute || (isFirst && !activePath);

    const open = opens?.[id] || false;
    const setOpen = useCallback(
        (flag) => {
            openCloseMenu(id, flag);
        },
        [id]
    );

    useEffect(() => {
        if (includeActivePage(child_items, activeRoute) || isActive) {
            setOpen(true);
        }
    }, [activeRoute, isActive]);

    const iconClasses = `w-6 h-6 cursor-pointer absolute right-4 hover:text-blue-600`;

    const borderStyle = 'bg-[rgba(211,220,228,1)]';

    return (
        <>
            <div className={`${docStyle}`}>
                <Link className={`py-2 pl-4 pr-8 w-full text-sm lg:text-base ${isActive ? 'text-blue-500 font-bold' : 'text-gray-500'} flex items-center relative`} to={route}>
                    {label}
                    {child_items && child_items.length ? (
                        !open ? (
                            <HiChevronRight
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpen(true);
                                }}
                                className={`${iconClasses}`}></HiChevronRight>
                        ) : (
                            <HiChevronDown
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpen(false);
                                }}
                                className={`${iconClasses}`}></HiChevronDown>
                        )
                    ) : null}
                </Link>
            </div>
            {child_items && child_items.length && open ? (
                <div className={`flex flex-col ml-5 relative`}>
                    {child_items.map((info) => {
                        return <MenuItem key={info?.id} info={info} website={website} opens={opens} openCloseMenu={openCloseMenu}></MenuItem>;
                    })}
                    <div className={`top-0 left-0 bottom-0 absolute w-px ${borderStyle}`}></div>
                </div>
            ) : null}
        </>
    );
};

export default function (props) {
    const { website } = props;

    const pages = website.getPageHierarchy({
        nested: true
    });

    const [opens, setOpens] = useState({});

    const openCloseMenu = (page, flag) => {
        setOpens((preOpens) => {
            return {
                ...preOpens,
                [page]: flag
            };
        });
    };

    return (
        <div className={`pb-12 pt-4 overflow-auto w-[275px]`}>
            {pages.map((item, i) => {
                const { label, hasData: isPage, child_items = null } = item;

                if (!isPage) {
                    return (
                        <div className={`my-4 flex flex-col`} key={i}>
                            <span className={`px-4 py-2 text-sm lg:text-base uppercase font-semibold text-[rgba(136,153,168,1)]`}>{label}</span>
                            {child_items && child_items.length
                                ? child_items.map((page) => {
                                      return <MenuItem key={page?.id} info={{ ...page }} website={website} opens={opens} openCloseMenu={openCloseMenu}></MenuItem>;
                                  })
                                : null}
                        </div>
                    );
                } else {
                    return <MenuItem key={i} info={{ ...item }} isFirst={i === 0} website={website} opens={opens} openCloseMenu={openCloseMenu}></MenuItem>;
                }
            })}
        </div>
    );
}
