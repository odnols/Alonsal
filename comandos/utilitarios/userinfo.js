const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

const getDateDiff = require('../../adm/funcoes/diffdatas.js');
const busca_emoji = require('../../adm/funcoes/busca_emoji.js');
const formata_data = require('../../adm/funcoes/formatadata.js');

const { emojis, emojis_negativos } = require('../../arquivos/json/text/emojis.json');

module.exports = {
    name: "userinfo",
    description: "Veja detalhes de algum usuario",
    aliases: [ "usinfo", "usuarioinfo", "usif" ],
    cooldown: 2,
    permissions: [ "SEND_MESSAGES" ],
    async execute(client, message, args) {

        const idioma_selecionado = client.idioma.getLang(message.guild.id); 
        
        const { utilitarios } = require(`../../arquivos/idiomas/${idioma_selecionado}.json`);
        const emojis_busto = ["๐งโโ๏ธ", "๐งโโ๏ธ", "๐ฎโโ๏ธ", "๐ฆนโโ๏ธ ", "๐ฉโ๐", "๐โโ๏ธ", "๐จโ๐", "๐ง", "๐จโ๐ญ", "๐งโโ๏ธ", "๐งโโ๏ธ", "๐จโโ๏ธ", "๐ฉโโ๏ธ", "๐จโ๐พ", "๐", "๐บ"];

        const ids_enceirados = ["597926883069394996", "665002572926681128", "610525028076748800", "678061682991562763", "813149555553468438", "434089428160348170", "735644852385087529"];

        let user = message.mentions.users.first(); // Coleta o ID do usuรกrio
        let nota_rodape = "";

        const emoji_nao_encontrado = busca_emoji(client, emojis_negativos);

        if (!user && typeof args[0] !== "undefined") {
            if (isNaN(Number(args[0].value)))
                return message.reply(`:octagonal_sign: | ${utilitarios[4]["id_user"]}`);

            try {
                user = await message.guild.members.fetch(args[0].raw);

                user = user.user; // Pega o usuรกrio pelo ID
            } catch (e) {
                return message.reply(`${emoji_nao_encontrado} | ${utilitarios[4]["nao_conhecido"]}`);
            }
        }

        if(typeof user === "undefined")
            user = message.author;

        let avatar_user = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?size=512`;
        const data_atual = new Date();

        const membro_sv = message.guild.members.cache.get(user.id); // Coleta dados como membro
        let data_entrada = formata_data(new Date(membro_sv.joinedTimestamp), idioma_selecionado == "al-br" ? "pt-br" : idioma_selecionado);
        let diferenca_entrada = getDateDiff(new Date(membro_sv.joinedTimestamp), data_atual, utilitarios);

        let data_criacao = formata_data(new Date(user.createdAt), idioma_selecionado == "al-br" ? "pt-br" : idioma_selecionado); // Cadastro do user
        let diferenca_criacao = getDateDiff(new Date(user.createdAt), data_atual, utilitarios);

        if (avatar_user !== null) {
            avatar_user = avatar_user.replace(".webp", ".gif");

            await fetch(avatar_user)
                .then(res => {
                    if (res.status !== 200)
                        avatar_user = avatar_user.replace('.gif', '.webp')
                });
        } else
            avatar_user = "";

        let apelido = user.username, tipo_user = "๐ค";

        if (membro_sv.nickname !== null)
            apelido = `${membro_sv.nickname}`;

        if (membro_sv.permissions.has("ADMINISTRATOR")) {
            tipo_user = "๐ก๏ธ";
            nota_rodape = utilitarios[13]["moderador"];
        }

        if(!tipo_user.includes("๐ก๏ธ") && !user.bot)
            tipo_user = emojis_busto[Math.round((emojis_busto.length - 1 ) * Math.random())];

        if (user.id === client.user.id)
            nota_rodape = utilitarios[13]["alonsal"];

        if (ids_enceirados.includes(user.id)) {
            if (nota_rodape !== "")
                nota_rodape += ", ";

            nota_rodape += utilitarios[13]["enceirado"];
        }
        
        const permissoes_user = membro_sv.permissions.toArray();
        let permissoes_fn = "";

        for(let i = 0; i < permissoes_user.length; i++){
            if(typeof permissoes_user[i + 1] === "undefined")
                permissoes_fn += " & ";

            permissoes_fn += `\`${permissoes_user[i]}\``;

            if(typeof permissoes_user[i + 2] !== "undefined")
                permissoes_fn += ", ";
        }

        permissoes_fn = permissoes_fn.slice(0, 2000);
        let emoji_hypesquad = "โ?", discord_premium = "โ?";
        
        if(!user.bot){
            if(user.flags.has("HOUSE_BRAVERY")) // HypeSquad
                emoji_hypesquad = busca_emoji(client, emojis.squad_bravery);

            if(user.flags.has("HOUSE_BALANCE"))
                emoji_hypesquad = busca_emoji(client, emojis.squad_balance);
            
            if(user.flags.has("HOUSE_BRILLIANCE"))
                emoji_hypesquad = busca_emoji(client, emojis.squad_brilliance);

            if(user.flags.has("EARLY_SUPPORTER"))
                discord_premium = busca_emoji(client, emojis.early_supporter);
            
            if(membro_sv.premiumSinceTimestamp) // Impulsionadores do servidor
                discord_premium += ` ${busca_emoji(client, emojis.boost)}`;
        }

        const infos_user = new MessageEmbed()
            .setTitle(`${apelido} ${emoji_hypesquad} ${discord_premium}`)
            .setColor(0x29BB8E)
            .setThumbnail(avatar_user)
            .addFields(
                {
                    name: ':globe_with_meridians: **Discord**',
                    value: `\`${user.username.replace(/ /g, "")}#${user.discriminator}\``,
                    inline: true
                },
                {
                    name: `:label: **Discord ID**`,
                    value: `\`${user.id}\``,
                    inline: true
                }
            )
            .addFields(
                {
                    name: `:birthday: **${utilitarios[13]["conta_criada"]}**`,
                    value: `${data_criacao}\n[ \`${diferenca_criacao}\` ]`,
                    inline: false
                },
                {
                    name: `:parachute: **${utilitarios[13]["entrada"]}**`,
                    value: `${data_entrada}\n[ \`${diferenca_entrada}\` ]`,
                    inline: false
                }
            )
            .setFooter(`${tipo_user} ${nota_rodape}`);

        const permissoes = new MessageEmbed()
        .setTitle(apelido)
        .setColor(0x29BB8E)
        .setThumbnail(avatar_user)
        .addFields({
            name: "Permissรตes", value: `${permissoes_fn}`, inline: true
        })
        .setFooter(nota_rodape);

        // try{
        //     let paginas = [
        //         infos_user,
        //         permissoes
        //     ];

        //     let embed_pags = await message.reply({embeds: [paginas[0]]});
        //     embed_pags.react('โ๏ธ').then(() => embed_pags.react('โถ๏ธ'));
            
        //     const filter = (reaction, user) => ['โ๏ธ', 'โถ๏ธ'].includes(reaction.emoji.name) && user.id === message.author.id;

        //     embed_pags.awaitReactions({ filter, max: 2, time: 15000, errors: ['time'] })
        //     .then(collected => {
        //         const reaction = collected.first();
        
        //         if (reaction.emoji.name === 'โถ๏ธ')
        //             embed_pags.edit({embeds: [paginas[0]]});
        //         else
        //             embed_pags.edit({embeds: [paginas[1]]});
        //     })
        //     .catch(() => embed_pags.reactions.removeAll());
        // }catch(err){
        //     console.log(err);
        // }

        return message.reply({embeds: [infos_user]})
    }
}