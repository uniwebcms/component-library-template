import React, { useRef, useEffect } from 'react';

export default function (props) {
    const { page, header, footer, body, leftPanel, rightPanel } = props;

    const containerRef = useRef(null);

    // Function to reset scroll position to the top of the container
    const resetScrollPosition = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    };

    useEffect(() => {
        resetScrollPosition();
    }, [page.options.pathname]);

    return (
        <div className={`bg-white`}>
            <div className={`h-[80px]`}>{header}</div>
            <div className={`relative flex h-[calc(100vh-80px)]`}>
                <div className={`w-[300px] pl-6 border-r hidden md:!flex flex-col bg-white h-full overflow-y-auto`}>{leftPanel}</div>
                <div className={`flex flex-1 overflow-auto`} ref={containerRef}>
                    <div className={`flex h-full flex-grow flex-col md:px-16`}>
                        {body}
                        {footer}
                    </div>
                    {rightPanel}
                </div>
            </div>
        </div>
    );
}
