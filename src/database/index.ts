import mongoose from "mongoose";

export default async function database(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URL as string, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error: any) {
    // this will handle just mongoose first time connection error
    if (error?.reason) {
      console.error(error.reason);
    } else {
      console.log(error.message);
    }
  }
}
