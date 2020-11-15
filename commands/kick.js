const util = require('util');
const discord = require('discord.js');
console.log('kick module active');

module.exports = async (message, args) => {

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
        return message.channel.send("i ain't got perms to kick people");

    }
    let usr = args.shift();
    let target = message.guild.members.cache.get(usr.slice(3, -1)) || message.guild.members.cache.get(usr.slice(2, -1));
    let reason = args.join(" ");
    if (!target) {
        return message.channel.send("please mention who should i kick");
    }
    if (target.user.id == message.author.id) {
        return message.channel.send("don't kick yourself");
    }
    if (!args[0]) {
        return message.channel.send("why should i kick him? (provide reason)");
    }
    try {
        await target.kick({ reason: reason });
    } catch {
        return message.channel.send("I couldn't kick that user.")
    }
    let trash_embed_LOL = new discord.MessageEmbed()
        .setTitle("Action: Kick")
        .setDescription(`kicked out ${target} (${target.id}) \ for: ${reason}`)
        .setColor("#ff2050")
        .setFooter(`kicked by ${message.author.username}`)
        .setTimestamp();
    message.channel.send(trash_embed_LOL);


}
