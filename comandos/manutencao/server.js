const { MessageEmbed } = require('discord.js');
const busca_emoji = require('../../adm/funcoes/busca_emoji');

module.exports = {
    name: "server",
    description: "O Hub multiconectado do alonsal",
    aliases: [ "hub" ],
    cooldown: 5,
    permissions: [ "SEND_MESSAGES" ],
    async execute(client, message) {

        const { manutencao } = require(`../../arquivos/idiomas/${client.idioma.getLang(message.guild.id)}.json`);
        const emoji_rainha = busca_emoji(client, '854830529928757269');

        const embed = new MessageEmbed()
        .setColor(0x29BB8E)
        .setTitle(`${manutencao[6]["hub_alonsal"]} ${emoji_rainha}`)
        .setURL('https://discord.gg/ZxHnxQDNwn')
        .setImage('https://i.imgur.com/NqmwCA9.png')
        .setDescription(manutencao[6]["info"]);

        const m = await message.channel.send(`${message.author} `+ manutencao[6]["despachei"]);
        await m.react('📫');

        client.users.cache.get(message.author.id).send({ embeds: [embed] });
    }
};