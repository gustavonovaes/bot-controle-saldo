const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const DB_DEFAULTS = {
  saldo: 0,
  registros: []
};

const dbFactory = filePath => {
  const adapter = new FileSync(filePath);
  const db = lowdb(adapter);

  db.defaults(DB_DEFAULTS).write();

  const registraLancamento = (usuario, valor, descricao) => {
    db.get("registros")
      .push({ usuario, valor, descricao, data: new Date().getTime() })
      .write();
  };

  const atualizaSaldo = novoSaldo => {
    db.update("saldo", saldo => saldo + novoSaldo).write();
  };

  const getSaldo = () => db.get("saldo").value();

  const desfazUltimoLancamento = () => {
    const registros = db.get("registros").value();
    if (!registros.length) {
      return;
    }
    
    const { valor } = registros.pop();

    db.update("registros", _ => registros).write();
    db.update("saldo", saldo => saldo - valor).write();
  };

  const getUltimosLancamentos = () => db.get("registros").value();

  const resetar = () => {
    db.update("registros", _ => []).write();
    db.update("saldo", _ => 0).write();
  };

  return {
    registraLancamento,
    atualizaSaldo,
    getSaldo,
    desfazUltimoLancamento,
    getUltimosLancamentos,
    resetar
  };
};

module.exports = {
  dbFactory
};
