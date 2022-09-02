import { Schema, model } from "mongoose";

export interface IUser {
  password: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  password: { type: String, required: true },
  email: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);
export default User;
