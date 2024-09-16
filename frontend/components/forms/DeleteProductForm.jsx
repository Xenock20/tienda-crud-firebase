"use client";

import React, { useState } from "react";

export default function DeleteProductForm({ product, onRefresh, closeModal }) {
    const [id, setId] = useState(product.id);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [buttonState, setButtonState] = useState("idle");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setButtonState("loading"); 

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
                setButtonState("success");

                setTimeout(() => {
                    onRefresh(3);
                    closeModal();
                }, 500);
            } else {
                throw new Error("Error al eliminar el producto");
            }
        } catch (error) {
            setButtonState("error"); // Cambia el estado del botón a error
            console.error("Error:", error);

            setTimeout(() => {
                onRefresh(1);
                closeModal();
            }, 500);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-gray-600">¿Seguro que quiere eliminar este producto?</h1>

            <input
                type="hidden"
                id="id"
                name="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
            />

            <div className="flex">
                <button
                    type="button"
                    onClick={closeModal}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out m-auto"
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className={`${
                        buttonState === "loading"
                            ? "bg-blue-500"
                            : buttonState === "success"
                            ? "bg-green-500"
                            : buttonState === "error"
                            ? "bg-red-500"
                            : "bg-yellow-500 hover:bg-yellow-600"
                    } text-white font-bold py-2 px-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out mx-1 w-full`}
                >
                    {buttonState === "loading"
                        ? "Eliminando..."
                        : buttonState === "success"
                        ? "Eliminado"
                        : buttonState === "error"
                        ? "Error"
                        : "Eliminar producto"}
                </button>
            </div>
        </form>
    );
}
