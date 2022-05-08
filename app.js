require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const bodyParser = require('body-parser')

const app = express();

// forma de ler JSON //MIDDLEWARES
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH")
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors());
    next();
})

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

// ROTAS DA API

// rota inicial /endpoins
const carsRoutes = require('./routes/carsRoutes');

// ROTA RAIZ
app.get('/', async(req, res) => {
    return res.json({
        ok: true,
        erro: false,
        datahome: {
            text_one: "Lorem Ipsum Sign", 
            text_second: "Dollar bien", 
            btn_title: "Create",
            btn_title_two: "Preview",
            btn_link: "https://localhost:3000/cars/create",
            btn_link_two: "https://localhost:3000/cars"
        }
    })
});

// ROTA DE CRIAÇÃO DE CARROS
app.use('/create-car', carsRoutes);
// ROTA DE PREVIEW DE CARROS
app.use('/cars', carsRoutes);

// CONEXÃO COM O BANCO DE DADOS
const DB_USER = process.env.DB_USER
const DB_PASS = encodeURIComponent(process.env.DB_PASS)

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASS}@apicluster.eehw6.mongodb.net/car-management?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log("Conexão com o bd foi realizada com sucesso!")
    })
    .catch((err) => console.log(err))
// CONECTANDO COM UMA PORTA
const port = process.env.PORT || 8000;
app.listen(port, (err) => {
    if(err) {
        console.log("eero ao iniciar o servidor")
    } else {
        console.log(`Servidor iniciado na porta ${port}: https://localhost:${port}`)
    }
});

