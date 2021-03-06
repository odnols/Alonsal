const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const busca_emoji = require('../../adm/funcoes/busca_emoji');
const getDateDiff = require('../../adm/funcoes/diffdatas.js');
const formata_data = require('../../adm/funcoes/formatadata.js');
const { emojis, emojis_dancantes } = require('../../arquivos/json/text/emojis.json');

module.exports = {
    name: "serverinfo",
    description: "Veja detalhes do servidor",
    aliases: [ "svinfo" ],
    cooldown: 5,
    permissions: [ "SEND_MESSAGES" ],
    async execute(client, message) {

        const idioma_selecionado = client.idioma.getLang(message.guild.id);
        const { utilitarios } = require(`../../arquivos/idiomas/${idioma_selecionado}.json`);

        const boost_sv = busca_emoji(client, emojis.boost);
        const figurinhas = busca_emoji(client, emojis.bigchad);
        const emoji_dancando = busca_emoji(client, emojis_dancantes);

        let dono_sv = message.guild.ownerId;
        const dono_membro = await message.guild.members.fetch(dono_sv);
        dono_sv = `\`${dono_membro.user.username.replace(/ /g, "")}#${dono_membro.user.discriminator}\`\n\`${dono_sv}\``;

        let icone_server = message.guild.iconURL({ size: 2048 });

        const canais_texto = message.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size;
        const canais_voz = message.guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size;
        const categorias = message.guild.channels.cache.filter(c => c.type === 'GUILD_CATEGORY').size;
        const qtd_canais = canais_texto + canais_voz;

        const qtd_membros = message.guild.memberCount;
        const data_atual = new Date();

        const data_entrada = formata_data(new Date(message.guild.joinedTimestamp), idioma_selecionado == "al-br" ? "pt-br" : idioma_selecionado); // Entrada do bot no server
        const diferenca_entrada = getDateDiff(new Date(message.guild.joinedTimestamp), data_atual, utilitarios);

        const data_criacao = formata_data(new Date(message.guild.createdAt), idioma_selecionado == "al-br" ? "pt-br" : idioma_selecionado); // Cria????o do servidor
        const diferenca_criacao = getDateDiff(new Date(message.guild.createdAt), data_atual, utilitarios);

        if(icone_server !== null){
            icone_server = icone_server.replace(".webp", ".gif");

            await fetch(icone_server)
            .then(res => {
                if(res.status !== 200)
                    icone_server = icone_server.replace('.gif', '.webp')
            });
        }else
            icone_server = "";

        const infos_sv = new MessageEmbed()
            .setTitle(message.guild.name)
            .setColor(0x29BB8E)
            .setThumbnail(icone_server)
            .addFields(
                {
                    name: `:globe_with_meridians: ${utilitarios[12]["id_server"]}`,
                    value: `\`${message.guild.id}\``,
                    inline: true
                },
                {
                    name: `:busts_in_silhouette: **${utilitarios[12]["membros"]}**`,
                    value: `:bust_in_silhouette: **${utilitarios[12]["atual"]}:** \`${qtd_membros.toLocaleString('pt-BR')}\`\n:arrow_up: **Max: **\`${message.guild.maximumMembers.toLocaleString('pt-BR')}\``,
                    inline: true
                },
                {
                    name: `:unicorn: **${utilitarios[12]["dono"]}**`,
                    value: dono_sv,
                    inline: true},
            )
            .addFields(
                {
                    name: `:placard: **${utilitarios[12]["canais"]} ( ${qtd_canais} )**`,
                    value: `:card_box: **${utilitarios[12]["categorias"]}:** \`${categorias}\`\n:notepad_spiral: **${utilitarios[12]["texto"]}:** \`${canais_texto}\`\n:speaking_head: **${utilitarios[12]["voz"]}:** \`${canais_voz}\``,
                    inline: true
                },
                {
                    name: `:vulcan: **${utilitarios[12]["entrada"]}**`,
                    value: `${data_entrada}\n[ \`${diferenca_entrada}\` ]`,
                    inline: true
                },
                {
                    name: `:birthday: **${utilitarios[12]["criacao"]}**`,
                    value: `${data_criacao}\n[ \`${diferenca_criacao}\` ]`,
                    inline: true
                }
            )
            .addFields(
                {
                    name: `:shield: **${utilitarios[12]["verificacao"]}**`,
                    value: `**${utilitarios[12][message.guild.verificationLevel]}**`,
                    inline: true
                },
                {
                    name: `${emoji_dancando} **Emojis ( ${message.guild.emojis.cache.size} )**`,
                    value: `${figurinhas} **${utilitarios[12]["figurinhas"]} ( ${message.guild.stickers.cache.size} )**`,
                    inline: true
                }
            );

        if(message.guild.premiumSubscriptionCount > 0)
            infos_sv.addFields(
                { 
                    name: `${boost_sv} **Boosts ( ${message.guild.premiumSubscriptionCount} )**`,
                    value: `:passport_control: **${utilitarios[12]["cargos"]}: ** \`${message.guild.roles.cache.size - 1}\``,
                    inline: true
                }
            )
        else
            infos_sv.addFields(
                { name: `:passport_control: **${utilitarios[12]["cargos"]} ( ${message.guild.roles.cache.size - 1} )**`, value: '???', inline: true}
            )

        return message.reply({embeds: [infos_sv]});
    }
}