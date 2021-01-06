const Discord = require("discord.js");
const fs = require("fs");
// Enter the bot's ID here
const TOKEN = "753205983349833748";
const prefix = "k!";

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

bot.once("ready", () => {
  bot.user.setStatus("dnd");

  bot.user.setPresence({

        activity: { 

            name: 'People use k!help',

            type: 'STREAMING'
  
 }
   })
 })

  console.log("Ready!");
  console.log(
    `Bot is ready and working in ${bot.guilds.cache.size} servers with ${bot.users.cache.size} users!`
  );




bot.on("guildCreate", async guild => {
  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
  );
  console.log(
    `I am now working in ${bot.guilds.cache.size} servers with ${bot.users.cache.size} users!`
  );
});

bot.on("guildMemberAdd", async member => {
  const channel = bot.channels.cache.get("channel id of the channel you want it to post it in");
  if (!channel) return;
  channel.send(
    `Hey <@${member.id}>! Welcome to _______ You are member ${member.guild.memberCount}, enjoy your stay!`
  );
});

bot.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  console.log(
    `I am now working in ${bot.guilds.size} servers with ${bot.users.size} users!`
  );
});

bot.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    bot.commands.get(commandName) ||
    bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

 

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(bot, message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
  
  bot.snipes = new Map();

bot.on('messageDelete', function(message, channel){

bot.snipes.set(message.channel.id,{

    content:message.content,

    author:message.author.tag,

    image:message.attachments.first() ? message.attachments.first().proxyURL : null

})

})
  
   

});

bot.login("TOKENHERELOL")
