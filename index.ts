import "dotenv/config";
import { Telegraf } from "telegraf";

if (process.env.TOKEN === "undefined")
  throw new Error("Bot token must be provided");
const bot = new Telegraf(process.env.TOKEN as string);

bot.command("help", (ctx) => ctx.reply("Olen elossa"));

bot.launch({
  webhook: {
    domain: "https://twelve-teams-nail-88-193-171-164.loca.lt",
    port: 3000,
  },
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
