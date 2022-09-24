import { newPurchase } from "../database";
import { getSum } from "./utils";

export const ostaHandler = async (ctx: any, user: any) => {
  newPurchase(getSum(ctx.update.message.text), user);
  ctx.reply("mäyy oon tää /osta kissa :3");
};
