import { model, Schema } from "mongoose";

// this is just readonly model so disable autoIndex
const UserViewModel = new Schema(
  {
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    surName: { type: String, required: true },
    email: { type: String, required: true },
  },
  { autoIndex: false, autoCreate: false }
);

const UserView = model("RedactUser", UserViewModel);

// UserView.createCollection({ viewOn: "users", pipeline: [] }); // return promise


// usage : same as model just import "UserView" and use it as model await UserView.find({name: "john"})

export { UserView };
