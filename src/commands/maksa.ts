import { payDebts } from "../database";
import { getSum } from "./utils";

export const maksaHandler = async (ctx: any, user: any) => {
  payDebts(getSum(ctx.update.message.text), user);
  ctx.reply("mäyy oon tää /maksa_piikki kissa :3");
};
