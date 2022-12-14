import mongoose from "mongoose";

export default async function database(): Promise<void> {
  try {
    mongoose.set("debug", process.env.MODE === "development");
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

/*
* const session = await mongoose.startSession(database);
* session.startTransaction()
* await session.commitTransaction() try block
* await session.abortTransaction() catch block
* await session.endSession() finally block
*
*
* const User = mongoose.model('Users', new mongoose.Schema({
  userId: String, wallet: Number
}));
const Transaction = mongoose.model('Transactions', new mongoose.Schema({
  userId: ObjectId, amount: Number, type: String
}));

await updateWallet(userId, 500);

async function updateWallet(userId, amount) {
  const session = await User.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const A = await User.findOneAndUpdate(
                    { _id: userId }, { $inc: { wallet: amount } }, opts);

    const B = await Transaction(
                    { usersId: userId, amount: amount, type: "credit" })
                    .save(opts);

    await session.commitTransaction();
    session.endSession();
    return true;
  } catch (error) {
    // If an error occurred, abort the whole transaction and
    // undo any changes that might have happened
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}
* */

// https://stackoverflow.com/questions/53435616/how-to-use-mongodb-transaction-using-mongoose
