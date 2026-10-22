const Cliente = require("../models/Cliente")
const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'


const cadastrarCliente = async (req, res) => {
    const valores = req.body

    const senhaCrypto = cryptoJS.AES.encrypt(valores.senha, "segredo").toString()
	const cpfCrypto = cryptoJS.AES.encrypt(valores.cpf, "segredo").toString()

    try {
        await Cliente.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCrypto, 
            cpf: cpfCrypto,     
            endereco: valores.endereco
        })
        return res.status(201).json({ message: 'Cliente cadastrado com sucesso!' })
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao cadastrar cliente!' })
    }
}

const listarClientes = async(req,res) =>{
    try{
        const clientes = await Cliente.findAll()
        let resultado = []
        clientes.forEach((el)=>{
            let cpfDescriptografado = ''
            try{
                const bytes = cryptoJS.AES.decrypt(el.cpf, CHAVE_SECRETA)
                cpfDescriptografado = bytes.toString(cryptoJS.enc.Utf8)
            }catch(err){
                cpfDescriptografado = 'Erro ao descriptografar!'
                console.error(cpfDescriptografado, err)
            }
            resultado.push({
                codCliente: el.codCliente,
                nome: el.nome,
                email: el.email,
                cpf: cpfDescriptografado,
                telefone: el.telefone
            })
        })
        return res.status(200).json(resultado)
    }catch (err) {
        console.error('Erro ao listar clientes!',err)
        return res.status(500).json({ message: 'Erro ao listar clientes!'})
    }
}
module.exports = {cadastrarCliente, listarClientes}