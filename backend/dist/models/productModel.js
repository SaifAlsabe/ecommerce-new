"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    countInStock: { type: Number, required: true },
    description: { type: String },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
});
var productModel = mongoose_1.default.model("Product", productSchema);
exports.default = productModel;
