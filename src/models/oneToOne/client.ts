import { Schema, model } from "mongoose";

const ClientSchema = new Schema(
  {
    clientName: { type: String, required: `path is required here` },
    website: String,
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  },
  { timestamps: true }
);

// Here, Client can have a single instance of Customer

const Client = model("Client", ClientSchema);

export { Client };
