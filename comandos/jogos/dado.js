module.exports = {
    name: "dado",
    description: "Rode um ou vários dados com várias faces",
    aliases: [ "da" ],
    cooldown: 2,
    permissions: [ "SEND_MESSAGES" ],
    execute(client, message, args) {

        let dado = []; 
        let resultado = "";
        let att_auto = 0;

        if(typeof args[0] === "undefined")
            args[0] = 1;

        if(args.length > 0){
            if(isNaN(args[0])){
                message.lineReply(`:warning: | informe **apenas números** para a quantidade de dados e número de faces.`);
                return;
            }

            if(typeof args[1] !== "undefined")
                if(isNaN(args[1])){
                    message.lineReply(`:warning: | Informe **apenas números** para a quantidade de dados e número de faces.`);
                    return;
                }
            
            if(args[0] > 50){
                message.lineReply(`:warning: | Não é possivel rodar mais que 50 dados ao mesmo tempo.`);
                return;
            }

            if(args[0] < 1){
                message.lineReply(`:warning: | Informe pelo menos 1 dado como \`.ada 1 <faces>\` para poder rodar.`);
                return;
            }

            if(typeof args[1] === "undefined"){
                args[1] = 5;
                att_auto = 1;
            }else{
                if(args[1] > 10000){
                    message.lineReply(`:warning: | Não é possivel rodar sólidos geométricos com mais de 10.000 faces.`);
                    return;
                }
            
                if(args[1] < 4){
                    message.lineReply(`:warning: | Não é possivel rodar sólidos geométricos com menos de 4 faces.`);
                    return;
                }
            }

            for(let i = 0; i < args[0]; i++){ // Rodar os dados
                dado.push(1 + Math.round((args[1] - 1) * Math.random()));
            }
        }

        for(let i = 0; i < dado.length; i++){
            resultado += "`"+ dado[i] +"`";

            if(typeof dado[i + 1] != "undefined")
                resultado += ", ";
        }

        if(att_auto == 1)
            args[1]++;
        
        let mensagem = 'Foram rodados `'+ args[0] +'` sólidos geométricos com `'+ args[1] +'` faces\n\n Resultados [ '+ resultado +' ]';

        if(args[0] == 1)
            mensagem = 'Foi rodado `1` sólido geométrico com `'+ args[1] +'` faces\n\n Resultado [ '+ resultado +' ]';
        
        message.lineReply(":game_die: "+ mensagem);
    }
};