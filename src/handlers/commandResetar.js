const formatarValor = require("../helpers/formatarValor");

module.exports = bot => {
  bot.command("resetar", ({ $db, reply }) => {
    $db.resetar();
    const novoSaldo = formatarValor($db.getSaldo());
    return reply(`Saldo atualizado! R$ ${novoSaldo}`);
  });
};
