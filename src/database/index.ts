import mongoose from "mongoose";

export default function database(): void {
  try {
    mongoose.connect(process.env.MONGO_URL as string);
    console.log("The database connection is successful");
  } catch (error: any) {
    console.log(error.message);
  }
}

// https://thecodebarbarian.com/working-with-mongoose-in-typescript.html
// https://mongoosejs.com/docs/typescript.html
// https://www.youtube.com/results?search_query=node+typescript+auth0+
// https://mongoosejs.com/docs/typescript/subdocuments.html
