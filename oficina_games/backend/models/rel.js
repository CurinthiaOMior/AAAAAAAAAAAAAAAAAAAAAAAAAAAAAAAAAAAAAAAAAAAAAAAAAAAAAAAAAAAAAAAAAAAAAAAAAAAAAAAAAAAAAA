const Agendamento = require("./Agendamento")
const Cliente = require("./Cliente")
const Console = require("./Console")

Cliente.hasMany(Console, {
	foreignKey: "idCliente",
	as: "consoleCliente",
	onDelete: "CASCADE"
})
Console.belongsTo(Cliente, {
	foreignKey: "idCliente",
	as: "clienteConsole"
})

Cliente.hasMany(Agendamento, {
	foreignKey: "idCliente",
	as: "agendamentoCliente",
	onDelete: "CASCADE"
})
Agendamento.belongsTo(Cliente, {
	foreignKey: "idCliente",
	as: "clienteAgendamento"
})

Console.hasMany(Agendamento, {
	foreignKey: "idConsole",
	as: "agendamentoConsole",
	onDelete: "CASCADE"
})
Agendamento.belongsTo(Console, {
	foreignKey: "idConsole",
	as: "Console"
})

module.exports = { Cliente, Console, Agendamento }
