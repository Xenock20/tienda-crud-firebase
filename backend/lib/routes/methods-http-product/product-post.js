"use strict";
const router = require("express").Router();
const {setDoc, doc } = require("firebase/firestore");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const multer = require("multer");
const { db, storage } = require("../../config/firebase.config"); // Firebase Firestore y Storage
const logger = require("../../logger");
const { getNextProductId } = require("../generatorId");

// Configuración de multer para subir archivos a Firebase Storage
const upload = multer({ storage: multer.memoryStorage() });

// Validar campos del producto
function validateFields(req, res, next) {
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    next();
}

// Subir imagen del producto a Firebase Storage
async function uploadImageProduct(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Image file is required" });
        }

        const file = req.file;
        const storageRef = ref(storage, `products/${file.originalname}`);

        const snapshot = await uploadBytes(storageRef, file.buffer);
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Agregar la URL de la imagen al request
        req.body.imageUrl = downloadURL;

        next();
    } catch (error) {
        logger.error(`POST updateImageProduct error: ${error}`);
        res.status(500).json({ error: "Error uploading image" });
    }
}

// Guardar producto en Firestore y dejar que Firebase genere el ID
async function saveProduct(req, res) {
    try {
        // Obtener el siguiente ID secuencial
        const productId = await getNextProductId();

        const productData = {
            id: productId, // Agregar el ID secuencial
            name: req.body.name,
            description: req.body.description,
            price: parseFloat(req.body.price),
            image: req.body.imageUrl,
        };

        // Añadir el producto a Firestore con el ID secuencial
        await setDoc(doc(db, "products", productId.toString()), productData);

        res.status(201).json({
            message: "Product created successfully",
            productId: productId, // Retornar el ID secuencial
            productData,
        });
    } catch (error) {
        logger.error(`POST saveProduct error: ${error}`);
        res.status(500).json({ error: "Error saving product" });
    }
}

router.post(
    "/product",
    upload.single("image"),
    validateFields,
    uploadImageProduct,
    saveProduct
);

module.exports = router;
