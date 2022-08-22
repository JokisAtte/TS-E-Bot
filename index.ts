import "dotenv/config";
import { Telegraf } from "telegraf";

if (process.env.TOKEN === "undefined")
  throw new Error("Bot token must be provided");
const bot = new Telegraf(process.env.TOKEN as string);

bot.command("help", (ctx) => ctx.reply("Olen elossa"));

bot.launch({
  webhook: {
    domain: "https://wise-houses-stare-85-76-145-100.loca.lt/",
    port: 3000,
  },
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
