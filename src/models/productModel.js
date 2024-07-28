import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    productKey: {
        type: String,
        required: [true, "Please provide a productKey"],
      },

      variantKey : {
        type: String,
        required: [true, "Please provide a variantKey "],
      },

      name: {
        type: String,
        required: [true, "Please provide name"],
      },

      image: {
        type: String,
        required: [true, "Please provide image"],
      },

      quantity : {
        type: Number,
        required: [true, "Please provide a quantity"],
      },

      price : {
        type: Number,
        required: [true, "Please provide a price "],
      },

  

});

const Product = mongoose.models.products || mongoose.model("products", productSchema);

export default Product;