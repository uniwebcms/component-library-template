import React from 'react';
import { CiApple, CiLemon, CiIceCream } from 'react-icons/ci';

export default function List(props) {
    const { block } = props;

    const { size = 'medium' } = block.getBlockProperties();

    const textClass = size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg';
    const iconSize = size === 'small' ? 'w-4 h-4' : size === 'medium' ? 'w-6 h-6' : 'w-8 h-8';

    return (
        <ul className="max-w-7xl mx-auto my-12">
            <li className="flex items-center space-x-2">
                <p className={textClass}>Apple</p>
                <CiApple className={`text-red-500 ${iconSize}`} />
            </li>
            <li className="flex items-center space-x-2">
                <p className={textClass}>Lemon</p>
                <CiLemon className={`text-yellow-300 ${iconSize}`} />
            </li>
            <li className="flex items-center space-x-2">
                <p className={textClass}>IceCream</p>
                <CiIceCream className={`text-purple-500 ${iconSize}`} />
            </li>
        </ul>
    );
}
