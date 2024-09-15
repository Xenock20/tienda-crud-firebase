import React from 'react';

export default function Modal({ onClose, children }) {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md">
                {children}
                <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Cerrar</button>
            </div>
        </div>
    );
}
