const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
require('dotenv').config();
const login = async ({email,password}) => {
    try {
        const user = await UserModel.findOne({ where: { email } });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const userId = user.id;
                const userName = user.name;
                const email = user.email;
                const phone = user.phone;

                const object = {
                    userId, userName, email, phone
                };

                const token = jwt.sign(object, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

                return token;
            } else {
                console.log("Incorrect password");
                throw new Error('incorrect password');    
            }
        } else {
            console.log("User not found");
            throw new Error('user not found !'); 
        }
    } catch (e) {
        console.error("Error during login:", e);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    login
}