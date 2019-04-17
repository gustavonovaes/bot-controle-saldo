const formatarValor = require("../helpers/formatarValor");

module.exports = bot => {
  bot.command("desfazer", ({ $db, reply }) => {
    $db.desfazUltimoLancamento();

    const novoSaldo = formatarValor($db.getSaldo());

    return reply(`Saldo atualizado! R$ ${novoSaldo}`);
  });
};
