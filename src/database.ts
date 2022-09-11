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
  handle: { type: String },
  tg_id: { type: String },
  balance: { type: Number },
});

const paymentSchema = new Schema<IPayment>({
  date: { type: String, required: true },
  total: { type: Number, required: true },
});

const User = model<IUser>("User", userSchema);
const Payment = model<IPayment>("payment", paymentSchema);

const logger = winston.createLogger();

try {
  connect(process.env.MONGO_DB_URI);
} catch (e) {
  logger.alert(e);
}

export const newUser = async (sender: any) => {
  try {
    const u = new User({
      handle: sender.username,
      tg_id: sender.id,
      balance: 0,
    });
    const s = await u.save();
    return true;
  } catch (e) {
    console.log(e);
  }
};

export const findUser = async (tg_id: any) => {
  return await User.find({ tg_id }).exec();
};

export const newPurchase = () => {};

export const getUsers = async () => {
  const result = await User.find({}).exec();
  return result;
};

export const payDebts = () => {};
