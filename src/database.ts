import moment from "moment";
import { connect, model, Schema } from "mongoose";
import winston from "winston";

const dateFormat = "HH:mm:ss-DDMMYY z";

interface IUser {
  handle: string;
  userid: string;
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
  userid: { type: String },
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
      userid: sender.id,
      balance: 0,
      transactions: [],
    });
    const s = await u.save();
    return true;
  } catch (e) {
    console.log(e);
  }
};

export const findUser = async (userid: any) => {
  const u = await User.find({ userid: userid }).exec();
  //User is returned in a list from database. Use u[0] to return the user object only
  return u[0];
};

export const newPurchase = async (sum: number, user: any) => {
  const thisTransaction = new Transaction({
    date: moment().format(dateFormat),
    total: -1 * sum,
  });
  user.transactions.push(thisTransaction);
  user.balance += -1 * sum;
  try {
    const response = await User.findOneAndUpdate(
      { userid: user.userid },
      { $set: user },
      { new: true, upsert: true }
    )
      .orFail()
      .exec();
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getUsers = async () => {
  const result = await User.find({}).exec();
  return result;
};

export const payDebts = async (sum: number, user: any) => {
  const thisTransaction = new Transaction({
    date: moment().format(dateFormat),
    total: sum,
  });
  user.transactions.push(thisTransaction);
  user.balance += sum;
  try {
    const response = await User.findOneAndUpdate(
      { userid: user.userid },
      { $set: user },
      { new: true, upsert: true }
    )
      .orFail()
      .exec();
    return response;
  } catch (e) {
    console.log("Virhe!", e);
  }
};
