if (process.env.NODE_ENV !== "production") require("dotenv").config();
// require("dotenv").config();

const axios = require("axios");
const instance = axios.create({
  baseURL: "https://api.tenor.com/v1/",
  timeout: 1000,
  params: {
    key: process.env.TENOR_API_KEY,
    locale: "en_US",
    contentfilter: "off",
    media_filter: "basic",
    ar_range: "all",
  },
});

async function getTenorGif(query) {
  return instance
    .get("/random", {
      params: {
        q: query,
        limit: 1,
      },
    })
    .then(response => response.data.results[0].url);
}

const Discord = require("discord.js");
const client = new Discord.Client();

client.login(process.env.DISCORD_TOKEN);

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async msg => {
  // if (msg.channel.id === process.env.DISCORD_CHANNEL_ID) {
  if (msg.content === "!twice") {
    msg.channel.send(await getTenorGif("twice"));
  } else if (msg.content === "!mina") {
    msg.channel.send(await getTenorGif("mina"));
  } else if (msg.content === "!bts") {
    msg.channel.send(await getTenorGif("nct"));
  } else if (msg.content === "!nct") {
    msg.channel.send(await getTenorGif("bts"));
  }
  // }
});
