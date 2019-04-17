const moment = require("moment");
const chunk = require("../helpers/chunk");
const formatarValor = require("../helpers/formatarValor");

module.exports = bot => {
  bot.command("historico", ({ $db, reply }) => {
    const ultimosRegistros = $db.getUltimosLancamentos();
    
    if (!ultimosRegistros.length) {
      return reply('You ta de bricathion with me cara?!');
    }
    
    const registrosChunk = chunk(ultimosRegistros, 10);

    registrosChunk.forEach(registros => {
      const msg = registros
        .map(registro => {
          const data = moment(registro.data).format("DD/MM/YYYY HH:mm");
          
          const valor = formatarValor(registro.valor);

          return `${data} ${registro.usuario} ${valor} ${registro.descricao}`;
        })
        .join("\n");

      reply(msg);
    });
  });
};
