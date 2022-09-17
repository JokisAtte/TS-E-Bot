import moment from "moment";
import { connect, model, Schema } from "mongoose";
import winston from "winston";

const dateFormat = "HH:mm:ss-DDMMYYY z";

interface IUser {
  handle: string;
  tg_id: string;
  balance: number;
  transactions: ITransaction[];
}

interface ITransaction {
  date: string;
  total: number;
}
const transactionSchema = new Schema<ITransaction>({
  date: { type: String },
  total: { type: Number },
});

const Transaction = model<ITransaction>("transaction", transactionSchema);

const userSchema = new Schema<IUser>({
  handle: { type: String },
  tg_id: { type: String },
  balance: { type: Number },
  transactions: [transactionSchema],
});

const User = model<IUser>("User", userSchema);

const logger = winston.createLogger();

try {
  connect(String(process.env.MONGO_DB_URI));
} catch (e) {
  logger.alert(e);
}

export const newUser = async (sender: any) => {
  try {
    const u = new User({
      handle: sender.username,
      tg_id: sender.id,
      balance: 0,
      transactions: [],
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

export const newPurchase = async (sum: number, user: any) => {
  const thisTransaction = new Transaction({
    date: moment().format(dateFormat),
    total: sum,
  });
  console.log(user);
  user["transactions"].append(thisTransaction);
  user["balance"] += -1 * sum;
  User.findByIdAndUpdate(
    { tg_id: user.tg_id },
    { $set: user },
    { new: true, upsert: true }
  );
};

export const getUsers = async () => {
  const result = await User.find({}).exec();
  return result;
};

export const payDebts = () => {};
