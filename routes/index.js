const {Router} = require('express');
const router = Router();
const Todo = require("../models/Todo");

router.get('/ping',(req, res, next) => {
    return res.send('pong')
});

router.get('/list', async (req, res, next) => {
    try {
        const todo = await Todo.find();
        res.status(200).json({list: todo});
    } catch (error) {
        res.status(500).json({status: 500, message: error})
    }
});

router.post('/create', async (req, res, next) => {
    try {
        const {
            tags,
            title,
            description
        } = req.body;
        if (!tags, !title, !description){
            res.status(400).json({status: 400, message: 'Llena todos los parametros Edwin :v'})
            return;
        };
        if (!Array.isArray(tags)) {
            res.status(400).json({status: 400, message: 'Tags tienen que ser un array :v'});
            return;
        }
        await Todo.create({tags, title, description})
        res.status(200).json({status: 200, message: 'Todo creado exitosamente!'});
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 500, message: error})
    }
})

router.put('/edit', async (req, res, next) => {
    try {
        const {
            tags,
            title,
            description,
            id,
        } = req.body;
        if (!id) {
            res.status(400).json({status: 400, message: 'Tienes que mandar el id para poder editar :v'})
            return;
        }
        await Todo.findByIdAndUpdate(id, {
            title,
            description,
            tags
        })
        res.status(200).json({status: 200, message: 'Todo editado exitosamente!'});
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 500, message: error})
    }
});

router.put('/edit', async (req, res, next) => {
    try {
        const {
            tags,
            title,
            description,
            id,
        } = req.body;
        if (!id) {
            res.status(400).json({status: 400, message: 'Tienes que mandar el id para poder editar :v'})
            return;
        }
        await Todo.findByIdAndUpdate(id, {
            title,
            description,
            tags
        })
        res.status(200).json({status: 200, message: 'Todo editado exitosamente!'});
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 500, message: error})
    }
});

router.delete('/delete', async (req, res, next) => {
    try {
        const {
            id,
        } = req.body;
        if (!id) {
            res.status(400).json({status: 400, message: 'Tienes que mandar el id para poder borrar un todo :v'})
            return;
        }
        await Todo.findByIdAndDelete(id)
        res.status(200).json({status: 200, message: 'Todo eliminado exitosamente!'});
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 500, message: error})
    }
})



module.exports = router;