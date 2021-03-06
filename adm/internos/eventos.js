const { MessageEmbed } = require('discord.js');

module.exports = async function({client}){

    client.on("guildCreate", guild => {
        let caso = 'New';
        require("./servers.js")({client, caso, guild});
    });
    
    client.on("guildDelete", guild => {
        let caso = 'Left';
        require("./servers.js")({client, caso, guild});
    });
    
    client.on("rateLimit", limit => {
        const embed = new MessageEmbed()
        .setTitle("> RateLimit :name_badge:")
        .setColor(0xff0000)
        .setDescription(`Command: \`${ult_comando}\`\nTimeout: \`${limit.timeout}\`\nLimit: \`${limit.limit}\`\nMethod: \`${limit.method}\`\n\nPath: \`${limit.path}\`\nRoute: \`${limit.route}\``);
    
        client.channels.cache.get('862015290433994752').send({ embeds: [embed] });
    });
}