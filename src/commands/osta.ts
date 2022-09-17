import { newPurchase } from "../database";

export const ostaHandler = async (ctx: any, user: any) => {
  newPurchase(getSum(ctx.update.message.text), user);
  ctx.reply("mäyy oon tää /osta kissa :3");
};

const getSum = (message: string) => {
  const regex = /\d+\.?\d*/;
  return Number(regex.exec(message));
};
