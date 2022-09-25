import { newPurchase } from "../database";
import { getSum } from "../utils";

export const ostaHandler = async (ctx: any, user: any) => {
  const sum = getSum(ctx.update.message.text);
  if (sum <= 0 || Number.isNaN(sum)) {
    ctx.reply(
      'Virheellinen summa. Oikea käyttö: "/osta <Summa>". Esimerkiksi "/osta 10".'
    );
    return;
  }
  const result = await newPurchase(sum, user);
  result !== undefined
    ? ctx.reply(`Piikkiin lisätty ${sum} €.`)
    : ctx.reply(
        "Jokin meni vikaan. Ota yhteys ylläpitoon, jos ongelma jatkuu."
      );
};
