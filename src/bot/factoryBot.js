const Telegraf = require("telegraf");

const factoryWebhookBot = (token) => {
   return new Telegraf(token);
};

module.exports = factoryWebhookBot;
