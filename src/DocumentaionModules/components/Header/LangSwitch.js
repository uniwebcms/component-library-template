import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { HiGlobeAlt } from 'react-icons/hi';

export default function ({ website }) {
    const validLanguages = website.getLanguages();

    let btnStyle = `mx-4 !outline-none cursor-pointer md:p-2.5 rounded-md flex items-center justify-center group rounded-md text-[rgba(0,0,0,0.6)] hover:bg-[rgb(236,242,254)] hover:text-[rgb(98,151,248)]`;

    return (
        <Popover className={`relative`}>
            {({ open }) => (
                <>
                    <Popover.Button as='div' className={btnStyle}>
                        <HiGlobeAlt className={`w-5 h-5 lg:w-6 lg:h-6`} />
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        show={open}
                        enter={`transition ease-out duration-200`}
                        enterFrom={`opacity-0 translate-y-1`}
                        enterTo={`opacity-100 translate-y-0`}
                        leave={`transition ease-in duration-150`}
                        leaveFrom={`opacity-100 translate-y-0`}
                        leaveTo={`opacity-0 translate-y-1`}>
                        <Popover.Panel
                            static
                            className={`absolute z-[999] top-full right-0 translate-x-5 md:translate-x-1/4 w-64 mt-2.5 -mr-0.5 sm:-mr-3.5 bg-white rounded-lg !shadow-xl border ring-1 ring-gray-900 ring-opacity-5 font-normal text-sm text-gray-900 divide-y divide-gray-100`}>
                            <div className={`py-1.5 px-3.5 flex flex-col`}>
                                {validLanguages.map((item) => {
                                    const { label, value } = item;
                                    return (
                                        <Popover.Button key={value} as={Fragment}>
                                            <span
                                                className={`py-1.5 hover:text-blue-500 text-gray-900 cursor-pointer`}
                                                onClick={() => {
                                                    website.changeLanguage(value);
                                                }}>
                                                {label}
                                            </span>
                                        </Popover.Button>
                                    );
                                })}
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}
