import { newUser } from "../database";

export const moroHandler = async (ctx: any) => {
  //Väliaikainen toteutus
  console.log("uus käyttäjä");
  newUser(ctx.from);
  //oikea toteutus
  /*   if (
    (await findUser(ctx.from.id)) === undefined &&
    isMsgFromCorrectGroup(ctx.chat.id)
  ) {
    (await newUser(ctx.from))
      ? ctx.reply("Käyttäjä luotu. Lähetä viestit jatkossa yksityisviestillä")
      : ctx.reply("Tapahtui virhe. Ota yhteys ylläpitoon");
  } */
};
