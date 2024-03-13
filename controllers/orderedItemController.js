const orderedItemModel = require('../models/orderedItemsModel');
const userModel = require('../models/userModel');

const getOrderedItems = async (decodedToken)=>{
    const email = decodedToken.email;
    try{

        const user = await userModel.findOne({where:{email}});
        const userID = user.userID;
        const orderedItems = await orderedItemModel.findAll({where:{userID}});
        return orderedItems;

    }catch(e){
        console.log(e);
    }
}


module.exports = {getOrderedItems};