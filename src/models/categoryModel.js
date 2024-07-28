import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

    categoryKey: {
        type: String,
        required: [true, "Please provide a categoryKey"],
      },

      name: {
        type: String,
        required: [true, "Please provide a name"],
      },

      image: {
        type: String,
        required: [true],
      },
});

const Category = mongoose.models.categorys || mongoose.model("categorys", categorySchema);

export default Category;