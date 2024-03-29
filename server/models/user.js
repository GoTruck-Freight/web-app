const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { 
        type: String, 
        required: true,
        unique: true
    },
    encryptedPassword: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['admin', 'restricted'], 
        required: true 
    },
});
module.exports = mongoose.model('Admins', userSchema)