import { connect, model, Schema } from "mongoose";
import winston from "winston";

interface IUser {
  handle: string;
  tg_id: string;
  balance: number;
}

interface IPayment {
  date: string;
  total: number;
}

const userSchema = new Schema<IUser>({
  handle: { type: String, required: true },
  tg_id: { type: String, required: true },
  balance: { type: Number, required: true },
});

const paymentSchema = new Schema<IPayment>({
  date: { type: String, required: true },
  total: { type: Number, required: true },
});

const User = model<IUser>("User", userSchema);
const Payment = model<IPayment>("payment", paymentSchema);
console.log("ollaa tääl");
const logger = winston.createLogger();

try {
  connect(process.env.MONGO_DB_URI);
} catch (e) {
  logger.alert(e);
}

export const newUser = async (user?: IUser) => {
  try {
    const u = new User(user);
    const s = await u.save();
    console.log("hei");
    console.log(s);
    return s;
  } catch (e) {
    console.log(e);
  }
};

export const findUser = () => {};

export const newPurchase = () => {};

export const getUsers = async () => {
  const result = await User.find({}).exec();
  //console.log(result);
  return result;
};

export const payDebts = () => {};
