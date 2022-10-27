interface ICommand {
    name: string
    desc: string
}

export const helpHandler = async (ctx: any, user: any) => {
    const commands: ICommand[] = [
        {
            name: '/moro',
            desc: 'Luo käyttäjän kantaan. Lähetetään ryhmächatistä',
        },
        { name: '/piikki', desc: 'Palauttaa sinun tämän hetken saldon' },
        { name: '/osta <summa>', desc: 'Osta tuote. Esim /osta 5' },
        {
            name: '/maksa_piikki <summa>',
            desc: 'Maksa velkaa pois. Esim /maksa_piikki 5',
        },
        { name: '/kaikki', desc: 'Näyttää kaikkien käyttäjien saldon' },
        { name: '/help', desc: 'Listaa kaikki komennot' },
    ]

    ctx.reply(formReply(commands))
}

const formReply = (commands: ICommand[]) => {
    let reply = ''
    commands.forEach((c) => {
        reply += `${c.name} - ${c.desc}\n`
    })
    return reply
}

