module.exports = bot => {
  bot.command("start", ({ replyWithMarkdown }) => {
    replyWithMarkdown(`#LULALIVRE`);
    
    const usage = 'Para usar o bot é muito simples, basta enviar uma mensagem com o valor e em seguida a descrição. Obedecendo o seguinte formato:\n\n`[valor] [descricao]`' + 
    "\n\nExemplos:" +
    "```\n" +
    "1000 Ganhei na loteria \n"+
    "-4,20 Maconha \n"+
    "-150 Internet \n"+
    '```'+
    "\nRepare os sinais dos valores. Créditos são lançados com valores positivos e débitos com negativos. \n\nMensagens enviadas que não seguem o formato são ignoradas.\n\n" +
    'Em caso de lançamentos errados, use o comando /desfazer para... desfazer. Para mais comandos digite /help'
    
    return replyWithMarkdown(usage);
  });
};
