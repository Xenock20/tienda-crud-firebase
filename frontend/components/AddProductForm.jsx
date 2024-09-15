"use client";

import React, { useState } from "react";

export default function AddProductForm ({onRefresh, closeModal}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un FormData para enviar los datos como multipart/form-data
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("image", image); // La imagen seleccionada

        try {
            const response = await fetch("http://localhost:3001/api/product", {
                method: "POST",
                body: formData, // Enviamos el FormData
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage("Producto agregado exitosamente!");
                setErrorMessage("");
                console.log(data);

                setTimeout(()=>{
                    onRefresh(1)
                    closeModal()
                }, 2500)
            } else {
                throw new Error("Error al agregar el producto");
            }
        } catch (error) {
            setErrorMessage("Error al enviar el producto");
            setSuccessMessage("");
            console.error("Error:", error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-6"
        >
            <h1>Agregar Producto</h1>
            <div className="flex flex-col">
                <label
                    htmlFor="name"
                    className="mb-2 text-sm font-medium text-gray-700"
                >
                    Nombre:
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Introduce el nombre del producto"
                />
            </div>

            <div className="flex flex-col">
                <label
                    htmlFor="description"
                    className="mb-2 text-sm font-medium text-gray-700"
                >
                    Descripción:
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe el producto"
                ></textarea>
            </div>

            <div className="flex flex-col">
                <label
                    htmlFor="price"
                    className="mb-2 text-sm font-medium text-gray-700"
                >
                    Precio:
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Introduce el precio"
                />
            </div>

            <div className="flex flex-col">
                <label
                    htmlFor="image"
                    className="mb-2 text-sm font-medium text-gray-700"
                >
                    Imagen:
                </label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                    className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
                Enviar producto
            </button>

            {errorMessage && (
                <p className="mt-2 text-red-600">{errorMessage}</p>
            )}
            {successMessage && (
                <p className="mt-2 text-green-600">{successMessage}</p>
            )}
        </form>
    );
}
