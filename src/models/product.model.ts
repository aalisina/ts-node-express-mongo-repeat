import mongoose from "mongoose";
// import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";
import { v4 as uuidv4 } from "uuid";

// const nanoid = customAlphabet("abcdefghijklmnopqrstuvxyz0123456789", 10);

export interface ProductDocument extends mongoose.Document {
  title: string;
  user: UserDocument["_id"];
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${uuidv4()}`,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
