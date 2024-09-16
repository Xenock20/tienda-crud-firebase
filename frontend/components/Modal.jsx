import React from 'react';

export default function Modal({ children, type }) {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className={`w-max md:h-max overflow-y-auto bg-white p-6 rounded-md ${type == 3 ? 'h-max' : 'h-5/6'}`}>
                {children}
            </div>
        </div>
    );
}
