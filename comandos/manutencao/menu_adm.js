const { MessageEmbed } = require('discord.js');
const busca_emoji = require('../../adm/funcoes/busca_emoji');
const { emojis_negativos, emojis_dancantes } = require('../../arquivos/json/text/emojis.json');

module.exports = {
    name: "menu_adm",
    description: "Informações de moderação do alonsal",
    aliases: [ "hm", "menuadm", "dm", "moderador", "mod" ],
    cooldown: 20,
    permissions: [ "ADMINISTRATOR" ],
    execute(client, message) {
        const idioma_adotado = client.idioma.getLang(message.guild.id);

        const emoji_nao_encontrado = busca_emoji(client, emojis_negativos);
        const emoji_dancando = busca_emoji(client, emojis_dancantes);

        const prefix = client.prefixManager.getPrefix(message.guild.id);

        let embed;

        if(idioma_adotado === "pt-br"){   
            embed = new MessageEmbed()
            .setTitle("Seus comandos Moderativos :scroll:")
            .setColor(0x29BB8E)
            .setDescription(`${emoji_dancando} **\`${prefix}ddemoji emoji_dancando \`${emoji_dancando}\` \`** - Adiciona um emoji ao servidor\n${emoji_nao_encontrado} **\`${prefix}rmoji \`${emoji_nao_encontrado}\` \`** - Remove um emoji do servidor\n:wastebasket: **\`${prefix}cl 10\`** - Remove várias mensagens de uma vez\n:closed_lock_with_key: **\`${prefix}lock\` | \`${prefix}unlk\`** - Bloqueia e desbloqueia um canal\n:axe: **\`${prefix}ban @Slondo motivo: gado d-\`** - Bane um usuário\n:leg: **\`${prefix}kick @Slondo\`** - Expulsa um usuário\n:symbols: **\`${prefix}px <novoprefixo>\`** - Altera o prefixo do Alonsal\n:video_game: **\`${prefix}angm <@cargo>\`** - Anúncios de jogos Gratuitos\n\n :hotsprings: | _Mensagens com este símbolo serão excluídas automaticamente._\n:octagonal_sign: | _Estes comandos não são habilitados para usuários sem cargos administrativos._\n:flag_us: | _Use the command \`${prefix}lang en\` to switch to \`american english\`_`)
            .setFooter(message.author.username, message.author.avatarURL({ dynamic: true }));
        }else{
            embed = new MessageEmbed()
            .setTitle("Your Moderative Commands :scroll:")
            .setColor(0x29BB8E)
            .setDescription(`${emoji_dancando} **\`${prefix}ddemoji dancing \`${emoji_dancando}\` \`** - Add an emoji to the server\n${emoji_nao_encontrado} **\`${prefix}rmoji ${emoji_nao_encontrado}\` \`** - Remove an emoji from the server\n:wastebasket: **\`${prefix}cl 10\`** - Remove multiple messages at once\n:closed_lock_with_key: **\`${prefix}lock\` | \`${prefix}unlk\`** - Lock and unlock a channel\n:axe: **\`${prefix}ban @Slondo reason: shameless\`** - Ban a user\n:leg: **\`${prefix}kick @Slondo\`** - Kicks out a user\n:symbols: **\`${prefix}px <newprefix>\`** - Change Alonsal prefix\n:video_game: **\`${prefix}angm <@tag>\`** - Free game notifications\n\n :hotsprings: | _Messages with this symbol will be automatically deleted._\n:octagonal_sign: | _These commands are not enabled for users without administrative roles._\n:flag_br: | _Use o comando \`${prefix}lang pt\` para trocar para o \`português brasileiro\`_`)
            .setFooter(message.author.username, message.author.avatarURL({ dynamic: true }));
        }

        client.users.cache.get(message.author.id).send({ embeds: [embed] });

        const permissions = message.channel.permissionsFor(message.client.user);
        if(permissions.has("MANAGE_MESSAGES")) // Permissão para gerenciar mensagens
            message.delete();
    }
};