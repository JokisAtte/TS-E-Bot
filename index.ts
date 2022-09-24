import "dotenv/config";
import { Telegraf } from "telegraf";
import { findUser } from "./src/database";

import {
  helpHandler,
  kaikkiHandler,
  maksaHandler,
  moroHandler,
  ostaHandler,
  piikkiHandler,
} from "./src/commands/index";

if (process.env.TOKEN === "undefined")
  throw new Error("Bot token must be provided");
const bot = new Telegraf(process.env.TOKEN as string);

// Listaa komennot
bot.command("help", async (ctx) => {
  const user = await findUser(ctx.from.id);
  if (user !== undefined) helpHandler(ctx, user);
});

// Listaa kaikki käyttäjät ja heidän velat
// Käytettävissä myös aktiivicasessa
bot.command("kaikki", async (ctx) => {
  if ((await findUser(ctx.from.id)) !== undefined) kaikkiHandler(ctx);
});

// Maksa piikkiäsi pois
bot.command("maksa_piikki", async (ctx) => {
  const user = await findUser(ctx.from.id);
  if (user !== undefined) maksaHandler(ctx, user);
  else ctx.reply("Jokin meni vikaan");
});

// Osta tuote. Lisää hinta piikkiin
bot.command("osta", async (ctx) => {
  const user = await findUser(ctx.from.id);
  if (user !== undefined) ostaHandler(ctx, user);
  else ctx.reply("Jokin meni vikaan");
});

// Palauttaa käyttäjän piikin
bot.command("piikki", async (ctx) => {
  if ((await findUser(ctx.from.id)) !== undefined) piikkiHandler(ctx);
});

// Lisää uuden käyttäjän tietokantaan
bot.command("moro", async (ctx) => {
  moroHandler(ctx);
  //if ((await findUser(ctx.from.id)) !== undefined) moroHandler(ctx);
});

//testikomento vastaako botti
bot.command("vastaa", async (ctx) => {
  ctx.reply("Mjäy :33");
  //if ((await findUser(ctx.from.id)) !== undefined) moroHandler(ctx);
});

bot.launch({
  webhook: {
    domain: "https://fresh-candies-lay-84-249-61-0.loca.lt",
    port: 3000,
  },
});

process.once("SIGINT", () => {
  console.log("SIGINT");
  bot.stop("SIGINT");
});
process.once("SIGTERM", () => {
  console.log("SIGTERM");
  bot.stop("SIGTERM");
});
