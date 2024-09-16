"use client";

import React from "react";
import { SlOptions } from "react-icons/sl";
import { IoIosArrowForward } from "react-icons/io";
import ProductImage from "../ProductImage";

export default function ItemProduct({
    product,
    id,
    activeDropdown,
    setActiveDropdown,
    onEditProduct,
    onDeleteProduct,
    onShowProduct,
}) {
    const isMenuOpen = activeDropdown === id;

    const toggleMenu = () => {
        if (isMenuOpen) {
            setActiveDropdown(null); // Si está abierto, lo cierra
        } else {
            setActiveDropdown(id); // Si está cerrado, lo abre
        }
    };

    const handleEdit = () => {
        onEditProduct(product); // Llamamos a la función para abrir el modal de edición con el producto
        setActiveDropdown(null); // Cierra el menú
    };

    const handleDelete = () => {
        onDeleteProduct(product);
        setActiveDropdown(null); // Cierra el menú después de hacer clic
    };

    const handleShow = () => {
        onShowProduct(product);
        setActiveDropdown(null); // Cierra el menú después de hacer clic
    };

    return (
        <tr className="hover:bg-gray-200 border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <td className="py-1 px-6">{product.id}</td>
            <ProductImage product={product}></ProductImage>
            <td className="py-1 px-6">{product.name}</td>
            <td className="py-1 px-6 max-w-xs">
                <p className="truncate">{product.description}</p>
            </td>
            <td className="py-1 px-6">$ {product.price}</td>
            <td className="py-1 px-6 relative">
                {/* Botón de opciones */}
                <button
                    onClick={toggleMenu}
                    className="focus:outline-none flex text-end space-x-16"
                >
                    {isMenuOpen ? (
                        <IoIosArrowForward className="text-lg" /> // Icono cuando el menú está abierto
                    ) : (
                        <SlOptions className="text-lg" /> // Icono por defecto cuando está cerrado
                    )}
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                    <div className="absolute right-1 -bottom-6 w-20 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                        <button
                            onClick={handleShow}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700  hover:bg-gray-100"
                        >
                            Info
                        </button>
                        <button
                            onClick={handleEdit}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Editar
                        </button>
                        <button
                            onClick={handleDelete}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600  hover:bg-gray-100"
                        >
                            Eliminar
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
}
