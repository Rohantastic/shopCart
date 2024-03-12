const productsModel = require('../models/productsModel');

const addProduct = async({name,description,price})=>{
    try{
        const response = await productsModel.create({name,description,price});
        return {
                productID: response.productID,
                name: response.name,
                description: response.description,
                price: response.price
                
        };
    }catch(e){
        console.log(e);
    }
}

const getProducts = async ()=>{
    try{
        const response = await productsModel.findAll();

        return response;
    }catch(e){
        console.log(e);
    }
}
module.exports = {getProducts,addProduct};