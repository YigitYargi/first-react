const mongoose = require('mongoose');
const{Schema,model} = mongoose;


const UserSchema = new mongoose.Schema({

email : {type:String , required:true, min: 4,unique:true},
password : {type:String , required:true},
username: {type:String , required: true,unique:true}, 
city: {type:String , required: false},
country : {type:String , required: false},
gender: {type:String , required: false},
photo: { type: Buffer, required: false }, 
user:{type:Schema.Types.ObjectId, ref:'User'},

});
 
const UserModel = mongoose.model('User',UserSchema);

module.exports = UserModel;