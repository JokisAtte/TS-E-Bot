import { payDebts } from "../database";
import { getSum } from "../utils";

export const maksaHandler = async (ctx: any, user: any) => {
  const sum = getSum(ctx.update.message.text);
  if (sum <= 0 || Number.isNaN(sum)) {
    ctx.reply(
      'Virheellinen summa. Oikea käyttö: "/maksa_velat <Summa>". Esimerkiksi "/maksa_velat 10" '
    );
    return;
  }
  const result = await payDebts(sum, user);
  result !== undefined
    ? ctx.reply(`Velkaa lyhennetty ${sum} € onnistuneesti.`)
    : ctx.reply(
        "Jokin meni vikaan. Ota yhteys ylläpitoon, jos ongelma jatkuu."
      );
};
