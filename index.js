require('dotenv').config();
const express = require('express');
const { Client, Intents, MessageAttachment } = require('discord.js');
const fs = require('fs');
const path = require('path');
const Canvas = require('canvas');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const axios = require('axios').default;
//const VKBot = require('node-vk-bot-api');
//const vk = new VKBot(process.env.TOKEN_VK);
const port = process.env.PORT || 7000;

// YD settings
const API_URL_YD = "https://cloud-api.yandex.net/v1/";
const API_URL_DISK_YD = API_URL_YD + "disk/";
const API_URL_DISK_RESOURCES_YD = API_URL_DISK_YD + "resources/";
const API_URL_DISK_RESOURCES_FILES_YD = API_URL_DISK_RESOURCES_YD + "files/";

const instance = axios.create();

instance.defaults.timeout = 2500;
instance.defaults.headers.common['Authorization'] = process.env.TOKEN_YD;

// express settings

const app = express();
app.get("/", function(res, req) {
  req.send('Auth');
});

app.listen(port, () => {
  console.log(`WebServer start on port: ${port}`);
});

// main

const Resources = [];                                                              
var nowDate = new Date();                                                          
client.on('ready', message => {                                                      
  const channel = message.channels.cache.get('803286281147908096');                  
  //channel.send(`Перезапуск бота. Дата и время запуска: ${nowDate}`);                 
  setInterval(async () => {
    instance.get(API_URL_DISK_RESOURCES_YD + 'last-uploaded/')                         
    .then((res) => {
        if (Resources == 0) {                                                                  
          res.data.items.forEach((item, index) => {
                Resources.push(item.name);
            });
        } else {                                                                               
          res.data.items.forEach((item, index) => {                                              
            let flag = false;                                                                  
            for (let pos in Resources)                                                         
            {                                                                                      
              if (Resources[pos] == item.name) flag = true;
            }
            if (!flag) {
              channel.send(`Новый файл на YD\n${item.name} : Ссылка: ${item.path}`);                    
              console.log(`Новый файл на YD\n${item.name} : Ссылка: ${item.path}`);             
              Resources.push(item.name);
            }                                                                              
          });
        }
    });
  }, 5000);
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
    const bg = await Canvas.loadImage(path.resolve('files', 'timetable.png'));
    context.drawImage(bg, 0, 0, canvas.width, canvas.height);
    const atach = new MessageAttachment(canvas.toBuffer(), 'timetable.png');
    console.log("message send");
    message.reply({ files: [atach] });

  } 
  else if (command === "долги" || command === "debts") {
    const canvas = Canvas.createCanvas(1400, 600);
    const context = canvas.getContext('2d');
    const bg = await Canvas.loadImage(path.resolve('files', 'debts.jpg'));
    context.drawImage(bg, 0, 0, canvas.width, canvas.height);
    const atach = new MessageAttachment(canvas.toBuffer(), 'debts.png');
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

client.login(process.env.TOKEN_DISCORD);
