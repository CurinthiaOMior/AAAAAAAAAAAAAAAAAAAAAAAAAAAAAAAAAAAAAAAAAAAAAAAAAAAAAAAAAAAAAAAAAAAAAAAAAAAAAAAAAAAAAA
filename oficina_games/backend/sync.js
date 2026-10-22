const { Cliente, Console, Agendamento } = require("./models/rel")
const db = require("./db/conn")

;(async () => {
	try {
		console.log("sincronizando tabelas...")
		await db.sync({ force: true })
	} catch (error) {
		console.error(error)
	} finally {
		await db.close()
		console.log("tabelas sincronizadas")
	}
})()
