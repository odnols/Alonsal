module.exports = {
    name: "piao",
    description: "Roda o pião dona maria!",
    aliases: [ "" ],
    cooldown: 5,
    permissions: [ "SEND_MESSAGES" ],
    execute(client, message) {
        
        const { diversao } = require(`../../arquivos/idiomas/${client.idioma.getLang(message.guild.id)}.json`);
        
        message.channel.send(`${diversao[4]["peao"]}! ${message.author}`);
        message.channel.send('https://tenor.com/view/pi%C3%A3o-da-casa-propria-silvio-santos-dona-maria-slondo-loop-gif-21153780').then(() => {
            const permissions = message.channel.permissionsFor(message.client.user);

            if(permissions.has("MANAGE_MESSAGES")) // Permissão para gerenciar mensagens
                message.delete();
        });
    }
};