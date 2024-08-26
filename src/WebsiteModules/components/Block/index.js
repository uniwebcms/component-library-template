import React from 'react';
import { FiPhone } from 'react-icons/fi';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FiMapPin } from 'react-icons/fi';

export default (props) => {
    // a example of block element with some sample content
    return (
        <section className='flex items-center justify-center mt-20'>
            <div className='border rounded-lg flex justify-between min-h-[180px] min-w-[360px] bg-primary'>
                <div className='w-5/12 flex items-center justify-center px-1'>
                    <img
                        className='w-avatar h-avatar object-cover rounded-avatar'
                        src='https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
                </div>
                <div className='w-7/12 py-4 pr-4'>
                    <p className='text-lg font-bold tracking-wide mb-3'>Jason Smith</p>
                    <div className='flex items-center space-x-2 mt-2'>
                        <div className='w-6 h-6 flex items-center justify-center rounded-full bg-white p-1 border'>
                            <FiPhone className='text-gray-500 w-full h-full' />
                        </div>
                        <p className='text-sm font-medium tracking-wide'>+1 234 567 890</p>
                    </div>
                    <div className='flex items-center space-x-2 mt-2'>
                        <div className='w-6 h-6 flex items-center justify-center rounded-full bg-white p-1 border'>
                            <MdOutlineMailOutline className='text-gray-500 w-full h-full' />
                        </div>
                        <p className='text-sm font-medium tracking-wide'>
                            <a href='mailto:example.com'>Example.com</a>
                        </p>
                    </div>
                    <div className='flex items-center space-x-2 mt-2'>
                        <div className='w-6 h-6 flex items-center justify-center rounded-full bg-white p-1 border'>
                            <FiMapPin className='text-gray-500 w-full h-full' />
                        </div>
                        <p className='text-sm font-medium tracking-wide'>123 Maple Street</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
