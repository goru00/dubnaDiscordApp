const { Client, Intents } = require('discord.js');
const disk = require('ya-disk');
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const API_TOKEN = process.env.TOKEN;

let backup; 

setInterval(async () => {
  try {
    const {items} = (await disk.meta.get(API_TOKEN, '/04'))._embedded;
    if (JSON.stringify(items) != JSON.stringify(backup)) {
      backup = items;
    }
    items.forEach((item, index) => console.log(`${index + 1}: ${item.name}`));
  } catch (error) {
    console.error(error);
  }
}, 5000);