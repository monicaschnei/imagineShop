import { ObjectId } from 'mongodb';
import ProductModel from '../schema/product-schema.js';

export class ProductService {

    constructor(){}

    async create(produtct){
      await  ProductModel.create(produtct)
    }

    async findAll (){
      return await ProductModel.find({});
    }
    

    async findById (id){
      return await ProductModel.findById(ObjectId(id));
    }
}

