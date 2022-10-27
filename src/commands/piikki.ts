export const piikkiHandler = async (ctx: any, user: any) => {
    ctx.reply(`${user.handle}: ${user.balance} €`)
}

