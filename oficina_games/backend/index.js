const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')

const authcontroller = require('./controller/auth.controller')
const clientecontroller = require('./controller/cliente.controller')
const consolecontroller = require('./controller/console.controller')
const agendamentocontroller = require('./controller/agendamento.controller')
const authMiddleware = require('./middleware/auth.middleware')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.status(200).json({ message: 'API PixelFix Rodando!' }))

// rotas publicas 
app.post('/login', authcontroller.login)
app.post('/cliente', clientecontroller.cadastrarCliente)

//rotas privadas
app.use(authMiddleware)

// cliente
app.get('/clientes', clientecontroller.listarClientes)

// console
app.post('/console', consolecontroller.cadastrarConsole)
app.get('/console/:id', consolecontroller.consultarConsole)

//agendamento
app.post('/agendamento', agendamentocontroller.cadastrarAgendamento)


conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro ao conectar com o banco de dados!', err)
    })