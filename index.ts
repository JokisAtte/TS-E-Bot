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
  if ((await findUser(ctx.from.id)) !== undefined) helpHandler(ctx);
});

// Listaa kaikki käyttäjät ja heidän velat
// Käytettävissä myös aktiivicasessa
bot.command("kaikki", async (ctx) => {
  if ((await findUser(ctx.from.id)) !== undefined) kaikkiHandler(ctx);
});

// Maksa piikkiäsi pois
bot.command("/maksa_piikki", async (ctx) => {
  if ((await findUser(ctx.from.id)) !== undefined) maksaHandler(ctx);
});

// Osta tuote. Lisää hinta piikkiin
bot.command("/osta", async (ctx) => {
  if ((await findUser(ctx.from.id)) !== undefined) ostaHandler(ctx);
});

// Palauttaa käyttäjän piikin
bot.command("/piikki", async (ctx) => {
  if ((await findUser(ctx.from.id)) !== undefined) piikkiHandler(ctx);
});

// Lisää uuden käyttäjän tietokantaan
bot.command("moro", async (ctx) => {
  if ((await findUser(ctx.from.id)) !== undefined) moroHandler(ctx);
});

bot.launch({
  webhook: {
    domain: "https://twenty-cloths-tease-84-249-61-0.loca.lt",
    port: 3000,
  },
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
