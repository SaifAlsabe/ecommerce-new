import productModel from '../models/productModel';
import { Request, Response } from 'express'

//get all products
export const productListController = async (req: Request, res: Response) => {
    const category = req.headers.category;
    const products = category ? await productModel.find({ category: category }) : await productModel.find({})
    res.send(products)
}

//find specific product
export const productDetailsController = async (req: Request, res: Response) => {
    const productId = req.params.id;
    const product = await productModel.find({ _id: productId })
    res.send(product[0])
}
