const formatarValor = require("../helpers/formatarValor");

module.exports = bot => {
  bot.hears(/^([\d-+,.]+) (.*)/, ({ $db, match, reply, from }) => {
    const valor = Number(match[1].replace(",", "."));
    const descricao = match[2];

    if (isNaN(valor)) {
      return reply(`Valor digitado não é um numero válido: "${match[1]}"`);
    }

    if (!descricao || descricao.length < 3) {
      return reply(`Descrição não fornecida ou inválida!`);
    }

    const usuario = from.username || from.first_name;
    $db.registraLancamento(usuario, valor, descricao);

    $db.atualizaSaldo(valor);

    const novoSaldo = formatarValor($db.getSaldo());
    return reply(`Saldo atualizado! R$ ${novoSaldo}`);
  });
};
