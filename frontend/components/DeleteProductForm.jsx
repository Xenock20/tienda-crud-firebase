"use client";

import React, { useState } from "react";

export default function DeleteProductForm({ product, onRefresh, closeModal }) {
    const [id, setId] = useState(product.id);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto JSON con el id
        const requestData = { id };

        try {
            const response = await fetch("http://localhost:3001/api/product", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json", // Indicar que el cuerpo es JSON
                },
                body: JSON.stringify(requestData), // Enviar el ID en el cuerpo
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage("Producto eliminado exitosamente!");
                setErrorMessage("");
                console.log(data);

                setTimeout(()=>{
                    onRefresh(3)
                    closeModal()
                }, 2500)
            } else {
                throw new Error("Error al eliminar el producto");
            }
        } catch (error) {
            setErrorMessage("Error al eliminar el producto");
            setSuccessMessage("");
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h1>Eliminar producto</h1>

            <input
                type="hidden"
                id="id"
                name="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
            />

            <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
                Eliminar producto
            </button>

            {errorMessage && <p className="mt-2 text-red-600">{errorMessage}</p>}
            {successMessage && <p className="mt-2 text-green-600">{successMessage}</p>}
        </form>
    );
}
