const router = require('express').Router()
// MODELS DE PERSON DO BANCO DE DADOS
const Cars = require('../models/Cars');


// CRIAÇÃO DE CARROS
router.post('/', async(req, res) => {
    // req.body
    const { 
        brand,
        model,
        sign,
        fabrication,
        type,
        version,
        form
    } = req.body;

    if(!brand) {
        res.status(422).json({ error: 'A marca é obrigatória'})
    } else if(!model) {
        res.status(422).json({ error: 'O modelo é obrigatório'})
    } else if(!sign) {
        res.status(422).json({ error: 'A placa é obrigatória'})
    } else if(!fabrication) {
        res.status(422).json({ error: 'A data de fabricação é obrigattória'})
    } else if(!type) {
        res.status(422).json({ error: 'O tipo é obrigatório'})
    } else if(!version) {
        res.status(422).json({ error: 'A versão é obrigatória'})
    } else if(!form) {
        res.status(422).json({ error: 'A forma é obrigatória'})
    }

    const Car = {
        brand,
        model,
        sign,
        fabrication,
        type,
        version,
        form        
    };

    // CREATE
    try {
        await Cars.create(Car)
        res.status(201).json({ message: 'Carro criado com sucesso' })
    } catch( error ) {
        res.status(500).json({error: error})
    }
});

// LEITURA DE TODOS OS DADOS
router.get('/', async (req, res) => {
    try {
        const cars = await Cars.find();

        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// LEITURA DE UM DADO POR ID
router.get('/:id', async (req, res) => {
    console.log(req.params.id)
    // EXTRAR O DADO DA REQUISIÇÃO
    const id = req.params.id;

    try {
        const car = await Cars.findOne({ _id: id });

        if(!car) {
            res.status(422).json({ message: 'Carro não foi encontrado '})
            return
        }

        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// UPDATE = ATUALIZAÇÃO DE DADOS
router.patch('/:id', async (req, res) => {
    const id = req.params.id;

    const { 
        brand,
        model,
        sign,
        fabrication,
        type,
        version,
        form
    } = req.body;

    const car = {
        brand,
        model,
        sign,
        fabrication,
        type,
        version,
        form        
    };

    try {
        const updateCar = await Cars.updateOne({ _id: id }, car);
        
        console.log(updateCar);

        if(updateCar.matchedCount === 0) {
            res.status(422).json({ message: "o carro não foi encontrado!" })
            return;
        }

        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const car = await Cars.findOne({ _id: id });

    if(!car) {
        res.status(422).json({ message: 'Carro não foi encontrado '})
        return
    }

    try {
        await Cars.deleteOne({_id: id});

        res.status(200).json({ message: 'Carro deletado com sucesso!'})
    } catch ( error ) {
        res.status(500).json({ error: error });
    }


})
module.exports = router;