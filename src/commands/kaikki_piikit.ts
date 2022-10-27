import { getUsers } from '../database'

export const kaikkiHandler = async (ctx: any) => {
    const users = await getUsers()
    let reply = ''
    users.forEach((u) => {
        reply += `${u.handle}: ${u.balance} €\n`
    })
    ctx.reply(reply)
}

