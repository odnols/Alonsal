module.exports = {
    name: "morse",
    description: "Codifique e decodifique do morse",
    aliases: [ "m" ],
    usage: "m <suamensagem>",
    cooldown: 3,
    permissions: [ "SEND_MESSAGES" ],
    execute(client, message, args) {
        
        const reload = require('auto-reload');
        const { idioma_servers } = reload('../../arquivos/json/dados/idioma_servers.json');
        const { utilitarios } = require('../../arquivos/idiomas/'+ idioma_servers[message.guild.id] +'.json');
        
        const { MessageEmbed } = require('discord.js');
        const morse = require('../../arquivos/json/text/morse.json');

        let ordena = "";
        let aviso = "";
        let tipo_texto = 0;
        let reverso = false; 

        let entrada;
        if(args.length > 0){
            for(let x = 0; x < args.length; x++){
                ordena += args[x] + " ";
            }
     
            if(ordena.indexOf("rev") !== -1){
                ordena = ordena.replace("rev ", "");
                reverso = true;
            }

            // Remove o último espaço
            entrada = ordena.slice(0, -1).toLowerCase();

            let texto = entrada.split(' ');

            if(Object.keys(morse).find(key => morse[key] === texto[0]))
                tipo_texto = 1;

            if(tipo_texto == 0){
                texto = entrada.split('');
                for(let carac = 0; carac < texto.length; carac++){
                    if(morse[texto[carac]])
                        texto[carac] = morse[texto[carac]] + " ";
                    else{
                        texto[carac] = "";
                        aviso = utilitarios[2]["caracteres"];
                    }
                }
            }else{
                for(let carac = 0; carac < texto.length; carac++){
                    if(Object.keys(morse).find(key => morse[key] === texto[carac]))
                        texto[carac] = Object.keys(morse).find(key => morse[key] === texto[carac]);
                }
            }

            if(reverso) // Inverte os caracteres
                texto = texto.reverse();
            
            // Montando 
            let texto_ordenado = "";
            for(let i = 0; i < texto.length; i++){
                texto_ordenado += texto[i];
            }

            let titulo = utilitarios[2]["codificado"];

            if(tipo_texto == 1)
                titulo = utilitarios[2]["decodificado"];

            if(texto_ordenado.length == 0){
                texto_ordenado = utilitarios[2]["carac_invalidos"];
                titulo = utilitarios[2]["error"];
            }

            const embed = new MessageEmbed()
                .setTitle(titulo)
                .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
                .setColor(0x29BB8E)
                .setFooter(aviso)
                .setDescription("`" + texto_ordenado + "`");

            message.lineReply(embed);
        }
    }
};