"use client";

import React from "react";

export default function ProductDetails({ product, closeModal }) {
    return (
        <div className="relative flex flex-col bg-white group/design-root overflow-x-hidden text-gray-500">
            <div className="flex items-center bg-white pb-2 justify-center">
                <h1 className="text-[#111418] text-2xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center py-6">
                    Detalles del Producto
                </h1>
            </div>
            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 m-auto">
                <div className="flex flex-col bg-gray-100 @container p-4 rounded-md">
                    <div className="w-60 h-60 md:w-80 md:h-80 gap-1 overflow-hidden bg-white @[480px]:gap-2 aspect-[3/2] rounded-xl flex m-auto">
                        {product.image && (
                            <div className="m-auto">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="m-auto object-contain w-max h-56"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col px-4 py-3">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold">Nombre del producto:</h2>
                        <p>{product.name}</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold">Descripción:</h2>
                        <p>{product.description}</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold">Precio:</h2>
                        <p>${product.price}</p>
                    </div>
                    <button 
                        onClick={closeModal}
                        className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out w-full"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
