import "dotenv/config";
import { Telegraf } from "telegraf";
import { getUsers } from "./src/database";
if (process.env.TOKEN === "undefined")
  throw new Error("Bot token must be provided");
const bot = new Telegraf(process.env.TOKEN as string);

bot.command("help", (ctx) => ctx.reply("Olen elossa"));
bot.command("kaikki", async (ctx) => {
  console.log("mäyy");
  console.log("result", await getUsers());
  console.log("valmis");
  ctx.reply("Kaikki käyttäjät");
});
console.log(process.env.NODE_ENV);
bot.launch({
  webhook: {
    domain: "https://twenty-cloths-tease-84-249-61-0.loca.lt",
    port: 3000,
  },
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
