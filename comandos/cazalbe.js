module.exports = async({message}) => {

    var gifs = ["https://tenor.com/view/lol-cazalbe-a-pra%C3%A7a-e-nossa-laughs-smile-gif-11991685", "https://tenor.com/view/cazalb%C3%A9-a-pra%C3%A7a%C3%A9nossa-laughs-smile-laughing-gif-11991636", "https://tenor.com/view/lol-cazalb%C3%A9-a-pra%C3%A7a%C3%A9nossa-laughs-smile-gif-11991672", "https://tenor.com/view/risada-laughter-rindo-laughing-funny-gif-15380722", "https://tenor.com/view/risada-laughter-rindo-laughing-funny-gif-15380713", "https://tenor.com/view/laugh-cazalbe-carlos-praca-alberto-gif-8717921", "https://tenor.com/view/cazalbe-carlos-alberto-praca-gif-8719460"];

    var num = Math.round(gifs.length * Math.random());
    
    if(num == gifs.length)
        num = 0;

    message.channel.send(gifs[num]);
}