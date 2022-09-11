import "dotenv/config";
import { Telegraf } from "telegraf";
import {
  findUser,
  getUsers,
  isMsgFromCorrectGroup,
  newUser,
} from "./src/database";
if (process.env.TOKEN === "undefined")
  throw new Error("Bot token must be provided");
const bot = new Telegraf(process.env.TOKEN as string);

// Listaa komennot
bot.command("help", (ctx) => ctx.reply("Olen elossa"));

// Listaa kaikki käyttäjät ja heidän velat
// Käytettävissä myös aktiivicasessa
bot.command("kaikki", async (ctx) => {
  console.log("mäyy");
  console.log("result", await getUsers());
  console.log("valmis");
  ctx.reply("Kaikki käyttäjät");
});

// Maksa piikkiäsi pois
bot.command("/maksa_piikki", async (ctx) => {
  console.log("mäyy oon tää /maksa_piikki kissa :3");
  ctx.reply("mäyy oon tää /maksa_piikki kissa :3");
});

// Osta tuote. Lisää hinta piikkiin
bot.command("/osta", async (ctx) => {
  console.log("mäyy oon tää /osta kissa :3");
  ctx.reply("mäyy oon tää /osta kissa :3");
});

// Palauttaa käyttäjän piikin
bot.command("/piikki", async (ctx) => {
  console.log("mäyy oon tää /piikki kissa :3");
  ctx.reply("mäyy oon tää /piikki kissa :3");
});

// Lisää uuden käyttäjän tietokantaan
bot.command("moro", async (ctx) => {
  if (
    findUser(ctx.from.id) === undefined &&
    isMsgFromCorrectGroup(ctx.chat.id)
  ) {
    (await newUser(ctx.from))
      ? ctx.reply("Käyttäjä luotu. Lähetä viestit jatkossa yksityisviestillä")
      : ctx.reply("Tapahtui virhe. Ota yhteys ylläpitoon");
  } else if (
    !isMsgFromCorrectGroup(ctx.chat.id) &&
    findUser(ctx.from.id) !== undefined
  ) {
    ctx.reply("Käytä komentoja vain yksityisviestillä");
  }
});

bot.launch({
  webhook: {
    domain: "https://twenty-cloths-tease-84-249-61-0.loca.lt",
    port: 3000,
  },
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
