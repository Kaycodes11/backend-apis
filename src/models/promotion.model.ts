import mongoose from "mongoose";

interface PromotionAttrs {
  price: number;
  startDate: Date;
  endDate: Date;
}

export interface PromotionDoc extends mongoose.Document {
  price: number;
  startDate: string;
  endDate: string;
}

interface PromotionModel extends mongoose.Model<PromotionDoc> {
  build(attrs: PromotionAttrs): PromotionDoc;
}

const promotionSchema = new mongoose.Schema({
  price: {
    type: Number,
  },
  startDate: {
    type: mongoose.Schema.Types.Date,
  },
  endDate: {
    type: mongoose.Schema.Types.Date,
  },
});

promotionSchema.statics.build = (attrs: PromotionAttrs) => {
  return new Promotion(attrs);
};

const Promotion = mongoose.model<PromotionDoc, PromotionModel>(
  "Promotion",
  promotionSchema
);

export { Promotion };
