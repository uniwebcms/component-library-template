import React, { Fragment, useState, useEffect, useRef, useCallback } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import ResultItem from './ResultItem';
import { MdClose } from 'react-icons/md';
import { HiSearch } from 'react-icons/hi';
import FlexSearch from 'flexsearch';

const SearchBox = (props) => {
    const { setResult, input, setInput, searchFn, website } = props;

    const box = useRef(null);

    useEffect(() => {
        if (box) {
            box.current.focus();
        }
    }, [box]);

    const handleSearch = (searchText) => {
        const result = searchFn(searchText);

        if (result instanceof Promise) {
            result.then((data) => {
                setResult(data);
            });
        } else {
            setResult(result);
        }
    };

    const placeholder = website.localize({
        en: 'Search...',
        fr: 'Recherche...'
    });

    return (
        <div className={`relative mx-auto text-gray-600 w-full flex items-center max-w-3xl md:px-4`}>
            <div className={`bg-white rounded-lg !shadow-md overflow-hidden flex-auto flex items-center`}>
                <input
                    className={`w-full flex-auto appearance-none bg-transparent pl-4 pr-8 py-4 text-gray-600 text-base sm:text-sm placeholder-gray-500 focus:outline-none`}
                    placeholder={placeholder}
                    value={input}
                    ref={box}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(e.target.value);
                        }
                    }}
                />
                <div
                    className={`p-4 cursor-pointer group`}
                    onClick={() => {
                        handleSearch();
                    }}>
                    <HiSearch className={`cursor-pointer w-5 h-5 text-gray-600 group-hover:text-gray-900`} />
                </div>
            </div>
        </div>
    );
};

const SearchResult = React.memo((props) => {
    const { result, website } = props;

    const fallback = (
        <div className={`flex flex-col mt-2 pt-4 md:mt-3 md:pt-3 md:px-4 max-w-3xl mx-auto`}>
            <span className={`text-white mb-4`}>
                {website.localize({
                    en: 'No search result.',
                    fr: 'Aucun résultat de recherche.'
                })}
            </span>
        </div>
    );

    let total = 0,
        hits = [];

    if (result) {
        if (!result.length) return fallback;

        hits = result?.[0]?.result;

        total = hits.length;

        if (!total) return fallback;
    } else {
        return null;
    }

    return (
        <div className={`flex flex-col mx-auto max-w-3xl w-full mt-5 md:px-4`}>
            <span className={`text-white mb-4 text-sm`}>
                {website.localize({
                    en: `${total} search results.`,
                    fr: `${total} Résultats de recherche.`
                })}
            </span>
            <div className={`bg-white relative rounded-lg [overflow:overlay] max-h-[calc(100vh-240px)]`}>
                {hits.length
                    ? hits.map((item, i) => {
                          return <ResultItem key={i} website={website} {...item?.doc} />;
                      })
                    : null}
            </div>
        </div>
    );
});

const SearchKit = (props) => {
    const [result, setResult] = useState(null);
    const [input, setInput] = useState('');

    return (
        <main className={`w-screen max-w-full h-screen p-5`}>
            <div className={`pt-11 mx-auto max-w-6xl`}>
                <SearchBox {...props} result={result} setResult={setResult} input={input} setInput={setInput} />
                <SearchResult {...{ result, ...props }} />
            </div>
        </main>
    );
};

const Search = (props) => {
    const { website, iconPosition = 'center' } = props;

    // const searchData = website.getSearchData();

    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const { useLocation } = website.getRoutingComponents();
    const location = useLocation();

    const path = location.pathname;

    const [searcher, setSearcher] = useState(null);

    const query = useCallback(
        (text) => {
            if (!searcher) {
                return website.getSearchData().then((data) => {
                    const index = new FlexSearch.Document({
                        document: {
                            id: 'href',
                            index: ['content'],
                            store: ['href', 'title', 'description', 'route', 'contentType', 'viewType', 'contentId', 'banner', 'avatar']
                        },
                        cache: true,
                        tokenize: 'forward'
                    });

                    const add = (sequential_data) => {
                        for (let x = 0, data; x < sequential_data.length; x++) {
                            data = sequential_data[x];

                            index.add({
                                ...data,
                                content: `${data.title} ${data.description} ${data.content}`
                            });
                        }
                    };

                    add(data);

                    setSearcher(index);

                    if (website) {
                        website.submitEvent('search', {
                            search_term: text
                        });
                    }

                    return index.search(text, {
                        enrich: true
                    });
                });
            } else {
                if (website) {
                    website.submitEvent('search', {
                        search_term: text
                    });
                }

                return searcher.search(text, {
                    enrich: true
                });
            }
        },
        [searcher]
    );

    useEffect(() => {
        if (isOpen) {
            closeModal();
        }
    }, [path]);

    return (
        <>
            <div className={`rounded-lg flex items-center justify-${iconPosition}`} onClick={openModal}>
                <HiSearch className={`cursor-pointer w-6 h-6 text-gray-600 hover:text-gray-800 ${props.iconClassName}`} style={props.iconStyle} />
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' className={`relative inset-0 z-50`} onClose={closeModal}>
                    <Transition.Child as={Fragment} enter={`ease-out duration-300`} enterFrom={`opacity-0`} enterTo={`opacity-100`} leave={`ease-in duration-200`} leaveFrom={`opacity-100`} leaveTo={`opacity-0`}>
                        <div onClick={closeModal} className={`fixed inset-0 bg-gray-900 bg-opacity-60 transition-opacity`} aria-hidden='true'></div>
                    </Transition.Child>
                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className={`min-h-screen px-4 flex justify-center`}>
                            <MdClose className={`w-10 h-10 text-gray-200 hover:text-white cursor-pointer absolute top-4 right-6 z-[51]`} onClick={closeModal}></MdClose>
                            <Transition.Child
                                as='div'
                                enter={`ease-out duration-300`}
                                enterFrom={`opacity-0 scale-95`}
                                enterTo={`opacity-100 scale-100`}
                                leave={`ease-in duration-200`}
                                leaveFrom={`opacity-100 scale-100`}
                                leaveTo={`opacity-0 scale-95`}>
                                <Dialog.Panel>
                                    <SearchKit website={website} searchFn={query}></SearchKit>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Search;
