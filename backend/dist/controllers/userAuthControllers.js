"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogout = exports.getAddress = exports.updateAddress = exports.updatePassword = exports.updateEmail = exports.updateUsername = exports.userLogin = exports.userSignup = void 0;
var userModel_1 = __importDefault(require("../models/userModel"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var handleErrors_1 = require("../middleware/handleErrors");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + '../.env' });
// create json web token
var maxAge = 3 * 24 * 60 * 60;
var createToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
};
var userSignup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userInfo, user, token, err_1, errors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userInfo = req.body.userInfo;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userModel_1.default.create(userInfo)];
            case 2:
                user = _a.sent();
                token = createToken(user._id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                res.status(201).json({ name: user.name, email: user.email });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                errors = handleErrors_1.handleErrors(err_1);
                console.log(errors);
                res.status(400).json(errors);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.userSignup = userSignup;
var userLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userInfo, email, password, user, token, err_2, errors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userInfo = req.body.userInfo;
                email = userInfo.email, password = userInfo.password;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userModel_1.default.login(email, password)];
            case 2:
                user = _a.sent();
                token = createToken(user._id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                res.status(200).json({ name: user.name, email: user.email, address: user.address });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                errors = handleErrors_1.handleErrors(err_2);
                res.status(400).json(errors);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.userLogin = userLogin;
var updateUsername = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, id, user, err_3, errors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.body.username;
                password = req.body.password;
                id = req.token.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userModel_1.default.updateUsername(username, id, password)];
            case 2:
                user = _a.sent();
                res.cookie('updated_username', 'Successfully updated username.', { maxAge: 5000 });
                res.status(200).json({
                    name: user.name,
                    email: user.email,
                });
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                errors = handleErrors_1.handleErrors(err_3);
                res.status(400).json(errors);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateUsername = updateUsername;
var updateEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, id, user, err_4, errors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                id = req.token.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userModel_1.default.updateEmail(email, id, password)];
            case 2:
                user = _a.sent();
                res.cookie('updated_email', 'Successfully updated email.', { maxAge: 5000 });
                res.status(200).json({ name: user.name, email: user.email });
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                errors = handleErrors_1.handleErrors(err_4);
                res.status(400).json(errors);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateEmail = updateEmail;
var updatePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newPassword, password, id, user, err_5, errors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newPassword = req.body.newPassword;
                password = req.body.password;
                id = req.token.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userModel_1.default.updatePassword(newPassword, id, password)];
            case 2:
                user = _a.sent();
                res.cookie('updated_password', 'Successfully updated password.', { maxAge: 5000 });
                res.status(200).json({ name: user.name, email: user.email });
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                errors = handleErrors_1.handleErrors(err_5);
                res.status(400).json(errors);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updatePassword = updatePassword;
var updateAddress = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, street, city, state, zipcode, country, password, id, user, err_6, errors;
    var _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _a = req.body, street = _a.street, city = _a.city, state = _a.state, zipcode = _a.zipcode, country = _a.country, password = _a.password;
                id = req.token.id;
                _g.label = 1;
            case 1:
                _g.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userModel_1.default.updateAddress(street, city, state, zipcode, country, id, password)];
            case 2:
                user = _g.sent();
                res.cookie('updated_address', 'Successfully updated address.', { maxAge: 5000 });
                res.status(200).json({
                    street: (_b = user.address) === null || _b === void 0 ? void 0 : _b.street,
                    city: (_c = user.address) === null || _c === void 0 ? void 0 : _c.city,
                    state: (_d = user.address) === null || _d === void 0 ? void 0 : _d.state,
                    zipcode: (_e = user.address) === null || _e === void 0 ? void 0 : _e.zipcode,
                    country: (_f = user.address) === null || _f === void 0 ? void 0 : _f.country,
                });
                return [3 /*break*/, 4];
            case 3:
                err_6 = _g.sent();
                errors = handleErrors_1.handleErrors(err_6);
                res.status(400).json(errors);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateAddress = updateAddress;
var getAddress = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, err_7, errors;
    var _a, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                id = req.token.id;
                _f.label = 1;
            case 1:
                _f.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userModel_1.default.findById(id)];
            case 2:
                user = _f.sent();
                res.status(200).json({
                    street: (_a = user === null || user === void 0 ? void 0 : user.address) === null || _a === void 0 ? void 0 : _a.street,
                    city: (_b = user === null || user === void 0 ? void 0 : user.address) === null || _b === void 0 ? void 0 : _b.city,
                    state: (_c = user === null || user === void 0 ? void 0 : user.address) === null || _c === void 0 ? void 0 : _c.state,
                    zipcode: (_d = user === null || user === void 0 ? void 0 : user.address) === null || _d === void 0 ? void 0 : _d.zipcode,
                    country: (_e = user === null || user === void 0 ? void 0 : user.address) === null || _e === void 0 ? void 0 : _e.country,
                });
                return [3 /*break*/, 4];
            case 3:
                err_7 = _f.sent();
                errors = handleErrors_1.handleErrors(err_7);
                res.status(400).json(errors);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAddress = getAddress;
var userLogout = function (req, res) {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).send('logged out successfully');
};
exports.userLogout = userLogout;
