import React from 'react';
import { tw } from '../../xtwind';

export default function Footer(props) {
    // a example of footer element with some sample links
    return (
        <footer className={tw`w-screen bg-gray-800 text-white p-4`}>
            <div className={tw`w-full flex justify-between`}>
                <div className={tw`flex flex-col`}>
                    <h3 className={tw`text-lg font-semibold`}>Footer</h3>
                    <p className={tw`text-sm`}>This is a footer.</p>
                </div>
                <div className={tw`flex flex-col`}>
                    <h3 className={tw`text-lg font-semibold`}>Links</h3>
                    <ul className={tw`text-sm`}>
                        <li>
                            <a href='#' className={tw`text-white hover:underline`}>
                                Link 1
                            </a>
                        </li>
                        <li>
                            <a href='#' className={tw`text-white hover:underline`}>
                                Link 2
                            </a>
                        </li>
                        <li>
                            <a href='#' className={tw`text-white hover:underline`}>
                                Link 3
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
