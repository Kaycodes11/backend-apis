import { Schema, model } from "mongoose";

const CustomerSchema = new Schema(
  {
    clientName: { type: String, required: `path is required here` },
    website: String,
  },
  { timestamps: true }
);

// Here, Customer can have a single instance of Client
const Customer = model("Customer", CustomerSchema);

export { Customer };
