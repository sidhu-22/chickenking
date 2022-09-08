const mongoose = require('mongoose');

const Auth = new mongoose.Schema(
    {
      name: {
          type:String,
          required:true,
          trim:true,
      },
      email: {
          type:String,
          required:true,
          trim:true,
          unique:true
      },
      mobile: {
          type:String,
          required:true,
          trim:true,
          unique:true
      },
      password: {
          type:String,
          required:true,
          trim:true, 
      },
      role: {
        type: String,
        default: "user",
      },
      orders:{
          type:Array,
          default:[]
      },
      cart:{
        type:Array,
        default:[]
      },
      image:{
        type:Object,
        default:{
            url:'https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg'
        }
      }
      
    },
    {
      collection: "users",
      timestamps: true,
    }
  );

module.exports = mongoose.model("Auth", Auth);



