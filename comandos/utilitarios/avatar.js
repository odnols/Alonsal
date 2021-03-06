const fetch = require('node-fetch');
const { MessageEmbed } = require("discord.js");
const busca_emoji = require('../../adm/funcoes/busca_emoji');
const { emojis_negativos } = require('../../arquivos/json/text/emojis.json');

module.exports = {
    name: "avatar",
    description: "mostra o avatar de um usuário",
    aliases: [ "vatar", "perfil" ],
    cooldown: 3,
    permissions: [ "SEND_MESSAGES" ],
    async execute(client, message, args) {

        let idioma = client.idioma.getLang(message.guild.id);
        idioma = idioma == "al-br" ? "pt-br" : idioma;
        
        const { utilitarios } = require(`../../arquivos/idiomas/${idioma}.json`);

        const emoji_nao_encontrado = busca_emoji(client, emojis_negativos);
        let user = message.mentions.users.first(); // Coleta o ID do usuário mencionado

        if(!user && args.length > 0){ 
            if (isNaN(Number(args[0].value))) // Verifica se é um ID realmente
                return message.reply(`:octagonal_sign: | ${utilitarios[4]["id_user"]}`);

            try{ // Busca pelo usuário no server inteiro
                user = await message.guild.members.fetch(args[0].raw);
                user = user.user; // Separa os dados de usuário
            }catch(e){
                return message.reply(`${emoji_nao_encontrado} | ${utilitarios[4]["nao_conhecido"]}`);
            }
        }

        if(!user) // Usa o autor do comando como alvo em último caso
            user = message.author;

        let url_avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?size=512`;
        const download_icon = utilitarios[4]["download_avatar"].replace("link_repl", url_avatar);

        fetch(url_avatar)
        .then(res => {
            if(res.status !== 200)
                url_avatar = url_avatar.replace('.gif', '.webp')

            const embed = new MessageEmbed()
            .setTitle(`${user.username}`)
            .setDescription(download_icon)
            .setColor(0x29BB8E)
            .setImage(url_avatar);
            
            message.reply({ embeds: [embed] });
        });
    }
}