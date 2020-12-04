"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userAuthControllers_1 = require("../controllers/userAuthControllers");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.post('/signup', userAuthControllers_1.userSignup);
router.post('/signin', userAuthControllers_1.userLogin);
router.get('/logout', userAuthControllers_1.userLogout);
router.get('/address', authMiddleware_1.requireAuth, userAuthControllers_1.getAddress);
// update user info in database 
router.patch('/update/username', authMiddleware_1.requireAuth, userAuthControllers_1.updateUsername);
router.patch('/update/email', authMiddleware_1.requireAuth, userAuthControllers_1.updateEmail);
router.patch('/update/password', authMiddleware_1.requireAuth, userAuthControllers_1.updatePassword);
router.patch('/update/address', authMiddleware_1.requireAuth, userAuthControllers_1.updateAddress);
exports.default = router;
