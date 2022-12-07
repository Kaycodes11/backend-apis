import mongoose from "mongoose";

export default async function database(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
  } catch (error: any) {
    console.log(error.message);
  }
}

