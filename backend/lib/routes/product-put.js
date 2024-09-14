"use strict";
const router = require("express").Router();
const { doc, updateDoc, getDoc } = require("firebase/firestore");
const {
    ref,
    deleteObject,
    uploadBytes,
    getDownloadURL,
} = require("firebase/storage");
const multer = require("multer");
const { db, storage } = require("../config/firebase.config");
const logger = require("../logger");

// Configuración de multer para subir archivos a Firebase Storage
const upload = multer({ storage: multer.memoryStorage() });

// Validar los campos del producto
function validateFields(req, res, next) {
    const { id, name, description, price } = req.body;

    if (!id || !name || !description || !price) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    next();
}

// Subir la nueva imagen del producto a Firebase Storage y eliminar la anterior
async function handleImageUpdate(req, res, next) {
    try {
        const productId = req.body.id;

        // Obtener el documento del producto de Firestore
        const productDocRef = doc(db, "products", productId);
        const productSnapshot = await getDoc(productDocRef);

        if (!productSnapshot.exists()) {
            return res.status(404).json({ error: "Product not found" });
        }

        const productData = productSnapshot.data();

        // Eliminar la imagen anterior si existe una nueva imagen en la solicitud
        if (req.file) {
            if (productData.image) {
                const oldImageRef = ref(storage, productData.image);
                await deleteObject(oldImageRef); // Eliminar la imagen anterior
            }

            // Subir la nueva imagen
            const file = req.file;
            const storageRef = ref(storage, `products/${file.originalname}`);
            const snapshot = await uploadBytes(storageRef, file.buffer);
            const downloadURL = await getDownloadURL(snapshot.ref);

            // Guardar la nueva URL de la imagen en el cuerpo de la solicitud
            req.body.imageUrl = downloadURL;
        } else {
            req.body.imageUrl = productData.image; // Si no se subió una nueva imagen, mantener la anterior
        }

        next();
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: "Error handling image update" });
    }
}

// Actualizar el producto en Firestore
async function updateProduct(req, res) {
    try {
        const productId = req.body.id;
        const updatedProductData = {
            name: req.body.name,
            description: req.body.description,
            price: parseFloat(req.body.price),
            image: req.body.imageUrl,
        };

        const productDocRef = doc(db, "products", productId);
        await updateDoc(productDocRef, updatedProductData);

        res.status(200).json({
            message: "Product updated successfully",
            productId,
            updatedProductData,
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: "Error updating product" });
    }
}

router.put(
    "/product",
    upload.single("image"),
    validateFields,
    handleImageUpdate,
    updateProduct
);

module.exports = router;
