"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + '../.env' });
var requireAuth = function (req, res, next) {
    var token = req.cookies.jwt;
    // check json web token exists & is verified
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, function (err, decodedToken) {
            if (err) {
                res.status(403).send(false);
            }
            else {
                req.token = decodedToken;
                next();
            }
        });
    }
    else {
        res.status(403).send(false);
    }
};
exports.requireAuth = requireAuth;
