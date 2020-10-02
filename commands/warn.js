const discord = require('discord.js');
console.log('warn module active');
var fs = require('fs');
var warnDB = JSON.parse(fs.readFileSync("wdb.json"));

module.exports = (message, args) => {

    let usr = args.shift();
    let target = message.guild.members.cache.get(usr.slice(3, -1)) || message.guild.members.cache.get(usr.slice(2, -1));
    let reason = args.join(" ");
    console.log(args);
    if (!target) {
        return message.channel.send("please mention who should i warn");
    }
    if (target.id == message.author.id) {
        return message.channel.send("please don't warn yourself");
    }
    if (!args[0]) {
        return message.channel.send("why should i warn him? (provide reason)");
    }

    let trash_embed_LOL = new discord.MessageEmbed()
        .setTitle("Action: Warn")
        .setDescription(`warned ${target} (${target.id}) \ for: ${reason}`)
        .setColor("#ff2050")
        .setFooter(`warned by ${message.author.username}`)
        .setTimestamp();


    if (warnDB[target] == undefined)
        warnDB[target] = [];


    warnDB[target].push({ "reason": reason, "time": Date.now() });
    fs.writeFileSync('wdb.json', JSON.stringify(warnDB));
    message.channel.send(trash_embed_LOL);

}
