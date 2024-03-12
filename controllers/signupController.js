const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const signup = async ({ name, password, email }) => {
    try {
        const user = await UserModel.findOne({ where: { email: email } });

        if (!user) {
            const hash = await bcrypt.hash(password, 10);
            const createdUser = await UserModel.create({ name, email, password: hash });

            
            return {
                id: createdUser.userID,
                name: createdUser.name,
                email: createdUser.email,
                
            };
        } else {
            return "Problem with creating a user";
        }
    } catch (e) {
        console.log(e);
        throw e; 
    }
};

module.exports =  {signup}