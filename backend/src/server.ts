import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import productsRoute from './routes/productRoutes';
import userRoute from './routes/userRoute';
import path from 'path';


// add  token variable to req
declare global {
    namespace Express {
        interface Request {
            token: {
                id: string
            }
        }
    }
}

const PORT = process.env.PORT || 5000;

const app = express();

dotenv.config({ path: __dirname + '/../.env' });

// middleware
app.use(express.json());
app.use(cookieParser());

//connect to MongoDB
const mongodbUrl = <string>process.env.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).catch(error => console.log(error))

// routes
app.use('/api/products', productsRoute);
app.use('/api/user', userRoute);

// deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../../frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../frontend', 'build', 'index.html'));
    });
}

// server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

