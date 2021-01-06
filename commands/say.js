const Discord = require("discord.js");

module.exports = {
  name: "say",

  async execute(bot, message, args) {
    let arg = message.content.split(" ").slice(1);

    let sayMessage = arg.join(` `);

    message.delete();

    if (message.content.includes("@everyone"))
      return message.channel.send(
        ":x: Mass mention is not allowed in this command"
      );

    if (message.content.includes("@here"))
      return message.channel.send(
        ":x: Mass mention is not allowed in this command"
      );

    message.delete();

    message.channel.send(sayMessage);
  }
};
