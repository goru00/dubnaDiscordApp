require('dotenv').config();
const { Client, Intents, MessageAttachment } = require('discord.js');
const fs = require('fs');
const path = require('path');
const disk = require('ya-disk');
const Canvas = require('canvas');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


var nowDate = new Date();
const API_TOKEN_YD = process.env.TOKEN;

client.on('ready', message => {
  message.channels.cache.get('803286281147908096').send(`Перезапуск бота. Дата и время запуска: ${nowDate}`);
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith("!")) return;

  const commandBody = message.content.slice("!".length);
  const commandArgs = commandBody.split(' ');
  const command = commandArgs.shift().toLowerCase();

  if (command === "расписание") {
    const canvas = Canvas.createCanvas(600, 800);
    const context = canvas.getContext('2d');
    const bg = await Canvas.loadImage(path.resolve('files', 'timetable.jpg'));
    context.drawImage(bg, 0, 0, canvas.width, canvas.height);
    const atach = new MessageAttachment(canvas.toBuffer(), 'timetable.png');
    console.log("message send");
    message.reply({ files: [atach] });

  } 
  else if (command === "help" || command === "помощь") {

    console.log("message send");
    let filecontent = fs.readFileSync(path.resolve('files', 'help.txt'), "utf8");
    message.reply(filecontent);

  } 
  else {

    message.reply('Сорян, братик, в этой ситуации я не абонент.');

  } 
});

client.login(process.env.BOT_TOKEN);