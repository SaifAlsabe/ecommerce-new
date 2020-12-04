"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var productRoutes_1 = __importDefault(require("./routes/productRoutes"));
var userRoute_1 = __importDefault(require("./routes/userRoute"));
var path_1 = __importDefault(require("path"));
var PORT = process.env.PORT || 5000;
var app = express_1.default();
dotenv_1.default.config({ path: __dirname + '/../.env' });
// middleware
app.use(express_1.default.json());
app.use(cookie_parser_1.default());
//connect to MongoDB
var mongodbUrl = process.env.MONGODB_URL;
mongoose_1.default.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).catch(function (error) { return console.log(error); });
// routes
app.use('/api/products', productRoutes_1.default);
app.use('/api/user', userRoute_1.default);
// deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('../frontend/build'));
    app.get('*', function (req, res) {
        res.sendFile(path_1.default.resolve(__dirname, '../../frontend', 'build', 'index.html'));
    });
}
// server
app.listen(PORT, function () {
    console.log("Server listening on port " + PORT);
});
