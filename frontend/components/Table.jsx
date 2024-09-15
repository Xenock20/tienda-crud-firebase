import React from "react";
import ItemProduct from "@/components/ItemProduct";

export default function Table({ products }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="py-2 px-6 text-gray-500 text-xm font-bold text-left">
                            #
                        </th>
                        <th className="py-2 px-6 text-gray-500 text-xm font-bold text-left">
                            Imagen
                        </th>
                        <th className="py-2 px-6 text-gray-500 text-xm font-bold text-left">
                            Nombre
                        </th>
                        <th className="py-2 px-6 text-gray-500 text-xm font-bold text-left">
                            Descripcion
                        </th>
                        <th className="py-2 px-6 text-gray-500 text-xm font-bold text-left">
                            Precio
                        </th>
                        <th className="py-2 px-6 text-gray-500 text-xm font-bold text-left"></th>
                    </tr>
                </thead>
                <tbody id="productTableBody" className="text-gray-700">
                    {products.length == 0 ? (
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted text-center">
                            <td colSpan={6} className="py-1 px-6 text-gray-600">
                                No hay productos
                            </td>
                        </tr>
                    ) : (
                        products.map((product, index) => (
                            <ItemProduct
                                product={product}
                                key={index}
                                id={index}
                            ></ItemProduct>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
