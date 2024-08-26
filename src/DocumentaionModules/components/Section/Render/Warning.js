import React from 'react';
import {
    HiExclamation,
    HiInformationCircle,
    HiCheckCircle,
    HiXCircle,
} from 'react-icons/hi';
import styles from '../Section.module.scss';

export default function (props) {
    const {
        attrs: { type },
        content,
    } = props;

    let Icon, color, borderColor, bgColor, wrapperStyle;
    if (type === 'warning') {
        Icon = HiExclamation;
        color = 'yellow';

        bgColor = 'bg-yellow-50';
        borderColor = 'border-yellow-400';
        wrapperStyle = 'text-yellow-700 [&_svg]:text-yellow-400';
    } else if (type === 'success') {
        Icon = HiCheckCircle;
        color = 'green';

        bgColor = 'bg-green-50';
        borderColor = 'border-green-400';
        wrapperStyle = 'text-green-700 [&_svg]:text-green-400';
    } else if (type === 'danger') {
        Icon = HiXCircle;
        color = 'red';

        bgColor = 'bg-red-50';
        borderColor = 'border-red-400';
        wrapperStyle = 'text-red-700 [&_svg]:text-red-400';
    } else if (type === 'info') {
        Icon = HiInformationCircle;
        color = 'blue';

        bgColor = 'bg-blue-50';
        borderColor = 'border-blue-400';
        wrapperStyle = 'text-blue-700 [&_svg]:text-blue-400';
    }

    return (
        <div
            selected={props.selected}
            className={
                `relative clear-both outline-none z-10 mt-10 mx-auto` +
                ` ${styles.Block}`
            }
        >
            <div
                className={`outline-none ${bgColor} border-l-4 ${borderColor} p-4`}
            >
                <div className={`flex items-center ${wrapperStyle}`}>
                    <div className={`flex-shrink-0`}>
                        <Icon className={`h-5 w-5`} aria-hidden="true" />
                    </div>
                    <div className={`ml-3 flex-1`}>
                        <div
                            className={`w-full block outline-none border-none text-lg ${styles.Alert} whitespace-pre-line`}
                            dangerouslySetInnerHTML={{ __html: content }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
