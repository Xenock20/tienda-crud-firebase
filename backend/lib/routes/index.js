"use strict";
const ProductGet = require("./methods-http-product/product-get");
const ProductPost = require("./methods-http-product/product-post");
const ProductPut = require("./methods-http-product/product-put");
const ProductDelete = require("./methods-http-product/product-delete");

module.exports = {
    ProductGet,
    ProductPost,
    ProductPut,
    ProductDelete,
};
