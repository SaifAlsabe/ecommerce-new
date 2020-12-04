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
exports.userSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var isEmail_1 = __importDefault(require("validator/lib/isEmail"));
var bcrypt_1 = __importDefault(require("bcrypt"));
exports.userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "please enter a name"],
        minlength: [3, "Minimum name length is 3"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail_1.default, "please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "please enter a password"],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    address: {
        type: {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            zipcode: { type: String },
            country: { type: String },
        }
    }
});
// hash password before saving
exports.userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var salt, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, bcrypt_1.default.genSalt()];
                case 1:
                    salt = _b.sent();
                    _a = this;
                    return [4 /*yield*/, bcrypt_1.default.hash(this.password, salt)];
                case 2:
                    _a.password = _b.sent();
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
// static method to login user
exports.userSchema.statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, auth;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.findOne({ email: email })];
                case 1:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 3];
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                case 2:
                    auth = _a.sent();
                    if (auth) {
                        return [2 /*return*/, user];
                    }
                    throw Error('incorrect password');
                case 3: throw Error('incorrect email');
            }
        });
    });
};
// static method to update username
exports.userSchema.statics.updateUsername = function (username, id, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, auth, newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.findById(id)];
                case 1:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 5];
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                case 2:
                    auth = _a.sent();
                    if (!auth) return [3 /*break*/, 4];
                    return [4 /*yield*/, userModel.findOneAndUpdate({ _id: id }, { $set: { name: username } }, { new: true })];
                case 3:
                    newUser = _a.sent();
                    if (newUser) {
                        return [2 /*return*/, newUser];
                    }
                    throw Error('Unable to update username, Error updating database.');
                case 4: throw Error('Unable to update username, Incorrect Password.');
                case 5: throw Error('Unable to update username, User not found.');
            }
        });
    });
};
// static method to update email
exports.userSchema.statics.updateEmail = function (email, id, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, auth, validEmail, newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.findById(id)];
                case 1:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 6];
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                case 2:
                    auth = _a.sent();
                    if (!auth) return [3 /*break*/, 5];
                    validEmail = isEmail_1.default(email);
                    if (!validEmail) return [3 /*break*/, 4];
                    return [4 /*yield*/, userModel.findOneAndUpdate({ _id: id }, { $set: { email: email } }, { new: true })];
                case 3:
                    newUser = _a.sent();
                    if (newUser) {
                        return [2 /*return*/, newUser];
                    }
                    throw Error('Unable to update email, Error updating database.');
                case 4: throw Error('Unable to update email, Please enter a valid email.');
                case 5: throw Error('Unable to update email, Incorrect Password.');
                case 6: throw Error('Unable to update email, User not found.');
            }
        });
    });
};
// static method to update password
exports.userSchema.statics.updatePassword = function (newPassword, id, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, auth, salt, newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.findById(id)];
                case 1:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 7];
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                case 2:
                    auth = _a.sent();
                    if (!auth) return [3 /*break*/, 6];
                    return [4 /*yield*/, bcrypt_1.default.genSalt()];
                case 3:
                    salt = _a.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(newPassword, salt)];
                case 4:
                    newPassword = _a.sent();
                    return [4 /*yield*/, userModel.findOneAndUpdate({ _id: id }, { $set: { password: newPassword } }, { new: true })];
                case 5:
                    newUser = _a.sent();
                    if (newUser) {
                        return [2 /*return*/, newUser];
                    }
                    throw Error('Unable to update password, Error updating database.');
                case 6: throw Error('Unable to update password, Incorrect Password.');
                case 7: throw Error('Unable to update password, User not found.');
            }
        });
    });
};
// static method to update address
exports.userSchema.statics.updateAddress = function (street, city, state, zipcode, country, id, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, auth, newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.findById(id)];
                case 1:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 5];
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                case 2:
                    auth = _a.sent();
                    if (!auth) return [3 /*break*/, 4];
                    return [4 /*yield*/, userModel.findOneAndUpdate({ _id: id }, {
                            $set: {
                                address: {
                                    street: street,
                                    city: city,
                                    state: state,
                                    zipcode: zipcode,
                                    country: country
                                }
                            }
                        }, { new: true })];
                case 3:
                    newUser = _a.sent();
                    if (newUser) {
                        return [2 /*return*/, newUser];
                    }
                    throw Error('Unable to update address, Error updating database.');
                case 4: throw Error('Unable to update address, Incorrect Password.');
                case 5: throw Error('Unable to update address, User not found.');
            }
        });
    });
};
var userModel = mongoose_1.default.model("User", exports.userSchema);
exports.default = userModel;
