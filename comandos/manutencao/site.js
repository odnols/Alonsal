const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "site",
    description: "O site do Alonsal",
    aliases: [ "website" ],
    cooldown: 5,
    permissions: [ "SEND_MESSAGES" ],
    async execute(client, message) {

        const { manutencao } = require(`../../arquivos/idiomas/${client.idioma.getLang(message.guild.id)}.json`);

        const embed = new MessageEmbed()
        .setColor(0x29BB8E)
        .setTitle("> Site Alonsal")
        .setURL('https://alonsal.glitch.me')
        .setImage('https://i.imgur.com/6yac4yR.png')
        .setDescription(manutencao[4]["comandos"]);

        const m = await message.channel.send(`${message.author} `+ manutencao[4]["despachei"]);
        await m.react('📫');

        client.users.cache.get(message.author.id).send({ embeds: [embed] });
    }
}