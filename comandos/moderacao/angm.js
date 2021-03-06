const { canal_games } = require('../../arquivos/data/games/canal_games.json');
const fs = require('fs');

module.exports = {
    name: "anungames",
    description: "receba atts de jogos gratuitos sempre que houver",
    aliases: [ "angm", "ngm" ],
    cooldown: 3,
    permissions: [ "SEND_MESSAGES" ],
    async execute(client, message, args) {

        const { moderacao } = require(`../../arquivos/idiomas/${client.idioma.getLang(message.guild.id)}.json`);

        if(args.length !== 1) return message.reply(moderacao[6]["aviso_1"]);
        
        if(!message.member.permissions.has("ADMINISTRATOR") && !client.owners.includes(message.author.id)) return message.reply(moderacao[5]["moderadores"]); // Libera configuração para proprietários e adms apenas

        const prefix = client.prefixManager.getPrefix(message.guild.id);

        function constructJson(jsonGuild, arrayValores){
            return { [jsonGuild] : arrayValores } 
        }

        const outputArray = []; // Transfere todos os dados do JSON para um array
        for(const element in canal_games){

            const canal = canal_games[element][0];
            const cargo = canal_games[element][1];

            if(args[0].raw !== "rem" || element !== message.guild.id){ // Remove um servidor/canal da lista de clientes no json
                outputArray.push(
                    constructJson(element, [canal, cargo])
                );
            }
        }

        const cargo_escolhido = args[0].raw.replace("<@&", "").replace(">", "").replace("!", "");

        for (let i = 0; i < outputArray.length; i++) { // Procura pelo ID do server e altera o idioma
            const obj = outputArray[i];

            const key = Object.keys(canal_games);

            if(key[i] === message.guild.id && args[0].raw !== "rem") {
                obj[message.guild.id][0] = message.channel.id;
                obj[message.guild.id][1] = cargo_escolhido;
                break;
            }
        }
        
        if(args[0].raw !== "rem") // Remove um servidor/canal da lista de clientes no json
            outputArray.push(constructJson(message.guild.id, [message.channel.id, cargo_escolhido]));
    
        let canal_servidor = JSON.stringify(outputArray, null, 4);
        canal_servidor = canal_servidor.replace("[", "");
        canal_servidor = canal_servidor.slice(0, -1);

        canal_servidor = canal_servidor.replaceAll("{", "").replaceAll("}", "");
        canal_servidor = `{ \"canal_games\" : { ${canal_servidor} } }`;

        canal_servidor = JSON.parse(canal_servidor); // Ajusta o arquivo
        canal_servidor = JSON.stringify(canal_servidor, null, 4);
        
        fs.writeFile('./arquivos/data/games/canal_games.json', canal_servidor, (err) => {
            if (err) throw err;
            
            let mensagem = `:video_game: | O Servidor ( \`${message.guild.name}\` | \`${message.guild.id}\` ) agora recebe atts de jogos grátis`;

            if(args[0].raw === "rem")
                mensagem = `:video_game: | O Servidor ( \`${message.guild.name}\` | \`${message.guild.id}\` ) não recebe mais atts de jogos grátis`;

            client.channels.cache.get('872865396200452127').send(mensagem);
        });

        delete require.cache[require.resolve('../../arquivos/data/games/canal_games.json')];

        let feedback_user = `${moderacao[6]["anuncio_games"]}\`${prefix}ngm rem\`${moderacao[6]["anuncio_games_2"]}`;

        if(args[0].raw === "rem")
            feedback_user = `:mobile_phone_off: | ${moderacao[6]["anuncio_off"]}`;

        message.reply(feedback_user);
    }
}