const userModel = require('../models/userModel');
const productModel = require('../models/productsModel');
const cartModel = require('../models/cartModel');

const addToCart = async (productID, decodedToken) => {
  try {
    const user = await userModel.findOne({ email: decodedToken.email });
    if (user) {
      const product = await productModel.findOne({ productID });
      if (!product) {
        throw new Error("Product does not exist");
      }

      const userID = user.userID;
      const response = await cartModel.create({ userID, productID });
      return {
        cartID: response.cartID,
        userID: response.userID,
        productID: response.productID
      }
    }
  } catch (e) {
    console.log(e);
  }
};


const getCarts = async (decodedToken) => {
  if (!decodedToken) {
    throw new Error('User not found!');
  }

  try {
    const email = decodedToken.email;
    const user = await userModel.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found!');
    }

    const userID = user.userID;

    const cartItems = await cartModel.findAll({
      where: { userID }
    });

    const productIDs = cartItems.map(cartItem => cartItem.productID);

    const products = await productModel.findAll({
      where: { productID: productIDs },
      attributes: ['productID', 'name', 'price','description']
    });

    const arrayOfCartItems = cartItems.map(cartItem => {
      const product = products.find(product => product.productID === cartItem.productID);
      return {
        cartID: cartItem.cartID,
        product: product.dataValues
      };
    });

    return arrayOfCartItems;
  } catch (error) {
    console.error('Error in getCarts:', error);
    throw new Error('Failed to get user carts');
  }
};





module.exports = { addToCart, getCarts };
