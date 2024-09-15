'use client';

import React from "react";

export default function HeadTable({ onAddProduct }) {
    return (
        <div className="flex flex-col space-y-1.5 p-2 sm:flex-row sm:justify-between">
            <div>
                <h3 className="text-2xl font-semibold leading-none tracking-tight text-gray-600">
                    Lista de productos
                </h3>
                <p className="text-sm text-muted-foreground text-gray-400">
                    Administre sus productos.
                </p>
            </div>
            <button
                onClick={onAddProduct} // Llamamos a la función para abrir el modal
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Agregar Producto
            </button>
        </div>
    );
}
