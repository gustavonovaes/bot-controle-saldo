const path = require("path");

const { loadHandlersByPath, factoryWebhookBot } = require("./bot");
const { dbFactory } = require("./db");

const botToken = process.env.BOT_TOKEN;
const projectName = process.env.PROJECT_NAME;
const webhookUrl = `https://${projectName}.glitch.me/webhook`;
const webhookPort = process.env.PORT;

const databasePath = path.join(path.dirname(__dirname), "databases");
const handlersPath = path.join(__dirname, "handlers");

const bot = factoryWebhookBot(botToken, webhookUrl, webhookPort);

bot.use((ctx, next) => {
  const chatId = ctx.chat.id;

  Object.defineProperty(ctx, "$db", {
    get: () => {
      const filePath = path.join(databasePath, `${chatId}.json`);
      return dbFactory(filePath);
    }
  });

  return next(ctx);
});

loadHandlersByPath(bot, handlersPath);
