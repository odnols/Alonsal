module.exports = async ({ message }) => {
    
    var gifs = ["https://tenor.com/view/galerito-leko-leko-gil-das-esfihas-briga-arremesso-gif-21195312", "https://tenor.com/view/galerito-meme-bicuda-brasil-slondo-gif-20747833", "https://tenor.com/view/galerito-balde-de%C3%A1gua-balde-gil-das-esfihas-gil-gif-21195983", "https://tenor.com/view/galerito-gil-das-esfiha-meme-br-meme-macaco-leko-leko-gif-15266106", "https://tenor.com/view/porradaria-gil-das-esfihas-cadeirada-cadeira-leko-leko-gif-21196023", "https://tenor.com/view/cadeirada-gil-das-esfihas-leko-leko-galerito-briga-gif-21195111", "https://tenor.com/view/galerito-macaco-leko-leko-slondo-porradaria-meme-gif-20747801", "https://tenor.com/view/cabe%C3%A7ada-gil-das-esfihas-briga-galerito-leko-leko-gif-21195110", "https://tenor.com/view/bicuda-macaco-leko-leko-galerito-slondo-gil-das-esfiha-gif-20747852", "https://tenor.com/view/arremesso-galerito-gil-das-esfihas-loop-reverse-gif-21151077"];

    var num = Math.round(gifs.length * Math.random());
    
    if(num == gifs.length)
        num = 0;

    if(num == 0)
        message.channel.send("ESFIHADA!");

    message.channel.send(gifs[num]);
}