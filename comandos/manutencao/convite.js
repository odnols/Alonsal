const Discord = require('discord.js');

module.exports = async function({message}){

    const embed = new Discord.MessageEmbed()
    .setColor(0x29BB8E)
    .setTitle("> Ó Abre alas que eu queru passsaa :notes:")
    .setURL('https://discord.com/oauth2/authorize?client_id=833349943539531806&scope=bot&permissions=3202112')
    .setThumbnail('https://i.imgur.com/K61ShGX.png')
    .setDescription("Convide-me clicando aqui!")
    .setTimestamp()
    .setFooter("Alonsal");
    
    message.channel.send(`${message.author}`, embed);
}