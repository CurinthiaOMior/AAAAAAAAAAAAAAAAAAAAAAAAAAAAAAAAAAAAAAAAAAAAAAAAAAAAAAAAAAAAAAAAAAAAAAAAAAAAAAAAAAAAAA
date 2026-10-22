const Console = require("../models/Console")

const cadastrarConsole = async (req, res) => {
    const valores = req.body
    try {
        const novoConsole = await Console.create(valores)
        return res.status(201).json({ message: 'Console cadastrado!', console: novoConsole })
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao cadastrar console!' })
    }
}

const consultarConsole = async (req, res) => {
   
    return res.status(500).json({ message: 'Função de consulta não implementada!' })
}

module.exports = {cadastrarConsole, consultarConsole}