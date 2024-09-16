"use client";

import React, { useState } from "react";

export default function AddProductForm({ onRefresh, closeModal }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [buttonState, setButtonState] = useState("idle");

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setImage(selectedFile);

            // Crear una URL de objeto para la vista previa del archivo
            const filePreview = URL.createObjectURL(selectedFile);
            setPreview(filePreview);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setButtonState("loading"); 

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
                setButtonState("success");

                setTimeout(() => {
                    onRefresh(1);
                    closeModal();
                }, 500);
            } else {
                throw new Error("Error al agregar el producto");
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
        <div class="relative flex flex-col bg-white group/design-root overflow-x-hidden">
            <div class="flex items-center bg-white pb-2 justify-center">
                <h1 class="text-[#111418] text-2xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center py-6">
                    Agrega Producto
                </h1>
            </div>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="flex flex-col md:flex-row space-y-6 md:space-y-0 m-auto"
            >
                <div class="flex flex-col bg-gray-100 @container p-4 rounded-md">
                    <div class="w-60 h-60 md:w-80 md:h-80 gap-1 overflow-hidden bg-white @[480px]:gap-2 aspect-[3/2] rounded-xl flex m-auto">
                        {preview && (
                            <div class="m-auto">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    class="m-auto object-contain w-max h-56"
                                />
                            </div>
                        )}
                    </div>
                    <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                        <label class="flex flex-col min-w-40 flex-1">
                            <div class="flex w-full flex-1 items-stretch">
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    required
                                    class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-[#111418] focus:outline-0 focus:ring-0 border-none focus:border-none h-14 p-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                                />
                            </div>
                        </label>
                    </div>
                </div>
                <div>
                    <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                        <label class="flex flex-col min-w-40 flex-1">
                            <div class="flex w-full flex-1 items-stretch">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-[#111418] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-none bg-[#f0f2f4] h-14 placeholder:text-[#637588] p-4 rounded-r-none pr-2 text-base font-normal leading-normal"
                                    placeholder="Nombre del producto"
                                />
                            </div>
                        </label>
                    </div>

                    <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                        <label class="flex flex-col min-w-40 flex-1">
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-[#111418] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-none bg-[#f0f2f4] h-14 placeholder:text-[#637588] p-4 rounded-r-none pr-2 text-base font-normal leading-normal"
                                placeholder="Descripcion del producto"
                            ></textarea>
                        </label>
                    </div>
                    <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                        <label class="flex flex-col min-w-40 flex-1">
                            <input
                                type="number"
                                id="price"
                                name="price"
                                step="0.01"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-[#111418] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-none bg-[#f0f2f4] h-14 placeholder:text-[#637588] p-4 rounded-r-none pr-2 text-base font-normal leading-normal"
                                placeholder="Introduce el precio"
                            />
                        </label>
                    </div>
                    <div className="flex flex-col px-4 py-3 m-auto">
                        <button
                            type="submit"
                            className={`${
                                buttonState === "loading"
                                    ? "bg-blue-500"
                                    : buttonState === "success"
                                    ? "bg-green-500"
                                    : buttonState === "error"
                                    ? "bg-red-500"
                                    : "bg-blue-500 hover:bg-blue-600"
                            } text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out m-auto w-full`}
                        >
                            {buttonState === "loading"
                                ? "Agregando..."
                                : buttonState === "success"
                                ? "Agregado"
                                : buttonState === "error"
                                ? "Error"
                                : "Agregar producto"}
                        </button>
                        <button type="button" onClick={closeModal} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out m-auto w-full my-2">Cancelar</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
