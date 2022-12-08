import { Schema, model, Model, HydratedDocument, Query } from "mongoose";
import bcrypt from "bcrypt";

interface Meta {
  pin: string;
  city: string;
  bio: string;
  mobile: string;
}

// first crate the interface to represent all the data within this UserSchema or User model/document
interface IUser {
  username: string;
  firstName: string;
  surName: string;
  email: string;
  password: string;
  avatar?: string;
  meta?: Meta;
  refreshTokens?: Array<string>;
}

// Put all user instance methods in this interface:
interface IUserMethods {
  fullName(): string;
  comparePass: (rawPassword: string) => Promise<boolean>;
}

// to make a model with method and static
interface UserModel extends Model<IUser, {}, IUserMethods> {
  createWithFullName(
    name: string
  ): Promise<HydratedDocument<IUser, IUserMethods>>;
}

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    surName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// setting up an index to properties needed
UserSchema.index({ email: 1 });

// this should be used on document's instance not model's instance
UserSchema.methods.comparePass = async function (
  rawPassword: string
): Promise<boolean> {
  return await bcrypt.compare(rawPassword, this.password);
};

// UserSchema.pre<IUser> will only provide properties/methods from IUser
// whereas UserSchema will provide all props/methods from mongoose.Schema
UserSchema.pre("save", async function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error: any) {
    return next(error);
  }

  next();
});

// this will be available on model's instance like User.createWithFullName("James Johnson")
UserSchema.static(
  "createWithFullName",
  function createWithFullName(name: string) {
    const [firstName, lastName] = name.split(" ");
    return User.create({ firstName, lastName });
  }
);

// this will available on document's instance as property
UserSchema.method("fullName", function (): string {
  return `${this.firstName} ${this.surName}`;
});

// UserSchema.query.getUsers = async function() {}

// what data this User model should have : User<IUser>
const User = model<IUser, UserModel>("User", UserSchema);

export { User, IUser };
