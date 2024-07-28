import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

 


      orderReferenceId  : {
        type: String,
      },


      Orderstatus : {
        type: String,
      },


      tva : {
        type: Number,
        required: [true, "Please provide a tva "],
      },


      totalht : {
        type: Number,
        required: [true, "Please provide a totalht "],
      },

      fraisport : {
        type: Number,
        required: [true, "Please provide a totalht "],
      },


      totalttc : {
        type: Number,
        required: [true, "Please provide a totalttc "],
      },

      itemReferenceId:String,

      DateCommande: {
        type: Date,
        default: Date.now 
      },




      shipping: [{
        street: {
          type: String,
          required: [true, "Please provide a street address"],
        },
        addressComplement: String,
        postalCode: {
          type: String,
          required: [true, "Please provide a postal code"],
        },
        city: {
          type: String,
          required: [true, "Please provide a city"],
        },
        country: String,
  
        phoneNumber: String,
  
    }],

      
      



      items: [{
        variantKey: { type: String, required: true },
        quantity: { type: Number, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        selectedDate:{ type: String},

    }],
 
      serviceLevel : {
        type: String,
        default: "standard",
      },

      userx:{
        type: mongoose.Types.ObjectId,
        ref: "users",
      },

      requestId: { 
        type: String,
        required: true, 
      },

    
});

const Order = mongoose.models.orders || mongoose.model("orders", orderSchema);

export default Order;