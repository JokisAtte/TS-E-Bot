import { isMsgFromCorrectGroup } from "../auth";
import { findUser, newUser } from "../database";

export const moroHandler = async (ctx: any) => {
  if (
    (await findUser(ctx.from.id)) === undefined &&
    isMsgFromCorrectGroup(ctx.chat.id)
  ) {
    (await newUser(ctx.from))
      ? ctx.reply("Käyttäjä luotu. Lähetä viestit jatkossa yksityisviestillä")
      : ctx.reply("Tapahtui virhe. Ota yhteys ylläpitoon");
  }
};
