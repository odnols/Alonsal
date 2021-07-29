const { MessageEmbed } = require('discord.js');
const { id_canais } = require('../config.json');

module.exports = async ({client, message, content}) => {
    const d = new Date();
    const day = d.getDay();
    let hr = d.getHours();
    let min = d.getMinutes();

    if(min < 10)
        min = "0" + min;

    let ampm = "am";
    if(hr > 12){
        hr -= 12;
        ampm = "pm";
    }

    const date = d.getDate();
    const month = d.toLocaleString('pt', { month: 'long' });
    const year = d.getFullYear();

    const embed = new MessageEmbed()
    .setTitle("> New interaction")
    .setColor(0x29BB8E)
    .setDescription(":man_raising_hand: (ID) User: `"+ message.author +"`\n:label: Username: `"+ message.author.username +"`\n\n:link: (ID) Server: `"+ message.guild.id +"`\n:label: Server name: `"+ message.guild.name +"`\n:link: (ID) Channel: `"+ message.channel.id + "`\n:label: Channel name: `"+ message.channel.name +"`\n:link: (ID) Message: `"+ message.id +"`\n\n:pencil: Command: `"+ content +"`\n:alarm_clock: Date/time: `"+ day + " " + hr + ":" + min + ampm + " " + date + " " + month + " " + year +"`");

    client.channels.cache.get(id_canais[1]).send(embed); // Envia o log com os comandos do usuário
}