const discord = require("discord.js") 
module.exports = {

    name: "snipe",

    aliases: ["ms", "snipe"],

    category: "fun",

    usage: "(prefix) snipe",

    description: "get deleted message",

    

    async execute (bot, message, args)  {

        

        const msg = bot.snipes.get(message.channel.id)

        if(!msg) return message.channel.send("there is no deleted messages")

        const embed = new discord.MessageEmbed()

        .setAuthor(msg.author)
        .setDescription(msg.content)

        .setColor('RANDOM')

        .setTimestamp()

        if(msg.image)embed.setImage(msg.image)

        message.channel.send(embed)

    }

}

