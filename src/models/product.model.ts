import mongoose from "mongoose";
import { PromotionDoc } from "./promotion.model";

interface ProductAttrs {
  name: string;
  promotions?: PromotionDoc[];
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): any;
}
interface ProductDoc extends mongoose.Document {
  name: string;
  promotions?: PromotionDoc[];
}
const productSchema = new mongoose.Schema({
  promotions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Promotion",
    },
  ],
});

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};
const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productSchema
);

export { Product };

/*
* 
* const product = await Product.findById(productId);

    if (!product) {
      throw new NotFoundError();
    }
const promotion = Promotion.build({
        price,
        startDate,
        endDate,
      });
      await promotion.save();
      product.promotions?.push();
      await product.save();
* 
* 
* 
* */


// https://stackoverflow.com/questions/46019149/many-to-many-with-mongoose
// https://stackoverflow.com/questions/11117854/many-to-many-mapping-with-mongoose
// https://stackoverflow.com/questions/62473609/how-to-handle-many-to-many-relationships-in-mongo
// https://stackoverflow.com/questions/68056887/mongodb-many-to-many-relationship-reference-with-extra-fields