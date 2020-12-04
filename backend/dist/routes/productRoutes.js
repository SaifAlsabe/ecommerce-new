"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var productControllers_1 = require("../controllers/productControllers");
var router = express_1.default.Router();
router.get('/', productControllers_1.productListController);
router.get('/productDetails/:id', productControllers_1.productDetailsController);
exports.default = router;
