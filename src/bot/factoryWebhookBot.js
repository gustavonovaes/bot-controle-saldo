const Telegraf = require("telegraf");

const factoryWebhookBot = (token, webhookUrl, webhookPort) => {
  const bot = new Telegraf(token);

  bot.telegram.setWebhook(webhookUrl);
  bot.startWebhook("/webhook", null, webhookPort);

  return bot;
};

module.exports = factoryWebhookBot;
