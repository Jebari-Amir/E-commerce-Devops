import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema({

    variantKey : {
        type: String,
        required: [true, "Please provide a variantKey "],
      },


});

const ProductVariant = mongoose.models.productVariants || mongoose.model("productVariants", productVariantSchema);

export default ProductVariant;