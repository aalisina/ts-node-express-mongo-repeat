import { Request, Response } from "express";
import {
  CreateProductInput,
  DeleteProductInput,
  ReadProductInput,
  UpdateProductInput,
} from "../schemas/product.schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from "../services/products.service";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>, // no params, no response body
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;
  // can wrap this in a try catch block
  const product = await createProduct({ ...body, user: userId });
  return res.send(product);
}
export async function getProductHandler(
  req: Request<ReadProductInput["params"]>,
  res: Response
) {
  const productId = req.params.productId;
  const product = await findProduct({ productId });
  if (!product) {
    return res.sendStatus(404);
  }
  return res.send(product);
}
export async function updateProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  const update = req.body;
  const product = await findProduct({ productId });
  if (!product) {
    return res.sendStatus(404);
  }
  if (product.user !== userId) {
    return res.sendStatus(403);
  }
  const updatedProduct = await findAndUpdateProduct({ productId }, update, {
    new: true,
  });
  return res.send(updatedProduct);
}
export async function deleteProductHandler(
  req: Request<DeleteProductInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  const product = await findProduct({ productId });
  if (!product) {
    return res.sendStatus(404);
  }
  if (product.user !== userId) {
    return res.sendStatus(403);
  }
  await deleteProduct({ productId });
  return res.sendStatus(200);
}
