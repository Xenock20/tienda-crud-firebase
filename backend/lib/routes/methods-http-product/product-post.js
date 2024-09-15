"use strict";
const router = require("express").Router();
const { setDoc, doc } = require("firebase/firestore");
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

// Obtener un ID único y agregarlo al request
async function generateProductId(req, res, next) {
    try {
        const productId = await getNextProductId();
        req.body.productId = productId; // Guardar el ID en el request
        next();
    } catch (error) {
        logger.error(`POST generateProductId error: ${error}`);
        res.status(500).json({ error: "Error generating product ID" });
    }
}

// Subir imagen del producto a Firebase Storage
async function uploadImageProduct(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Image file is required" });
        }

        const file = req.file;
        const productId = req.body.productId;
        const uniqueFileName = `${productId}.${file.originalname.split('.').pop()}`;
        const storageRef = ref(storage, `products/${uniqueFileName}`);

        const snapshot = await uploadBytes(storageRef, file.buffer);
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Agregar la URL de la imagen al request
        req.body.imageUrl = downloadURL;

        next();
    } catch (error) {
        logger.error(`POST uploadImageProduct error: ${error}`);
        res.status(500).json({ error: "Error uploading image" });
    }
}

// Guardar producto en Firestore
async function saveProduct(req, res) {
    try {
        const productData = {
            id: req.body.productId, // Usar el ID generado previamente
            name: req.body.name,
            description: req.body.description,
            price: parseFloat(req.body.price),
            image: req.body.imageUrl,
        };

        // Añadir el producto a Firestore con el ID generado
        await setDoc(doc(db, "products", req.body.productId.toString()), productData);

        res.status(201).json({
            message: "Product created successfully",
            productId: req.body.productId, // Retornar el ID generado
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
    generateProductId,
    uploadImageProduct,
    saveProduct
);

module.exports = router;
