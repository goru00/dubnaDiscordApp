const { Client, Intents, MessageAttachment } = require('discord.js');
const fs = require('fs');
const path = require('path');
const disk = require('ya-disk');
require('dotenv').config();
const Discord = require('discord.js');
const Canvas = require('canvas');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const API_TOKEN = process.env.TOKEN;

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith("!")) return;
  const commandBody = message.content.slice("!".length);
  const commandArgs = commandBody.split(' ');
  const command = commandArgs.shift().toLowerCase();
  if (command === "расписание") {
    const canvas = Canvas.createCanvas(600, 700);
    const context = canvas.getContext('2d');
    const bg = await Canvas.loadImage(path.resolve('files', 'timetable.jpg'));
    context.drawImage(bg, 0, 0, canvas.width, canvas.height);
    const atach = new Discord.MessageAttachment(canvas.toBuffer(), 'timetable.png');
    console.log("message send");
    message.reply({ files: [atach] });
  } else if (command === "help" || command === "помощь") {
    console.log("message send");
    let filecontent = fs.readFileSync(path.resolve('files', 'help.txt'), "utf8");
    message.reply(filecontent);
  } else {
    message.reply('Сорян, братик, в этой ситуации я не абонент.');
  } 
});

client.login(process.env.BOT_TOKEN);