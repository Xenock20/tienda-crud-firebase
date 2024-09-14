"use strict";
const router = require("express").Router();
const { doc, deleteDoc, getDoc } = require("firebase/firestore");
const { ref, deleteObject } = require("firebase/storage");
const { db, storage } = require("../../config/firebase.config"); // Firebase Firestore y Storage
const logger = require("../../logger");

// Validar que el ID del producto esté presente en el body
function validateProductId(req, res, next) {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
    }

    next();
}

// Eliminar la imagen asociada del producto en Firebase Storage
async function deleteProductImage(productData) {
    try {
        if (productData.image) {
            const imageRef = ref(storage, productData.image);
            await deleteObject(imageRef); // Eliminar la imagen del almacenamiento
        }
    } catch (error) {
        logger.error(`DELETE deleteProductImage error: ${error}`);
        throw new Error("Error deleting product image");
    }
}

// Eliminar el producto en Firestore
async function deleteProduct(req, res) {
    try {
        const productId = req.body.id;

        // Obtener el documento del producto de Firestore
        const productDocRef = doc(db, "products", productId);
        const productSnapshot = await getDoc(productDocRef);

        if (!productSnapshot.exists()) {
            return res.status(404).json({ error: "Product not found" });
        }

        const productData = productSnapshot.data();

        // Eliminar la imagen asociada del producto
        await deleteProductImage(productData);

        // Eliminar el documento del producto en Firestore
        await deleteDoc(productDocRef);

        res.status(200).json({
            message: "Product and associated image deleted successfully",
            productId,
        });
    } catch (error) {
        logger.error(`DELETE deleteProduct error: ${error}`);
        res.status(500).json({ error: "Error deleting product" });
    }
}

router.delete("/product", validateProductId, deleteProduct);

module.exports = router;
