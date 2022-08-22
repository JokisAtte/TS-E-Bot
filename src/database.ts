import { model, Schema } from "mongoose";

interface IUser {
  handle: string;
  tg_id: string;
  balance: number;
}

interface IPayment {
  date: string;
  amount: number;
}

const userSchema = new Schema<IUser>({
  handle: { type: String, required: true },
  tg_id: { type: String, required: true },
  balance: { type: Number, required: true },
});

const User = model<IUser>("User", userSchema);

export const newUser = () => {
    
};

export const findUser = () => {
    
};

export const newPurchase = () => {

}

export const getUsers = () => {

}

export const payDebts = () => {

}