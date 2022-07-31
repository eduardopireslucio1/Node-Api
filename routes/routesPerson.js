const router = require('express').Router()
const Person = require('../models/Person')

router.post('/', async (req, res) => {
    const {name, salary, approved} = req.body

    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatório!' })
    }

    if (!salary) {
        res.status(422).json({ error: 'O salário é obrigatório!' })
    }

    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person)

        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/', async (req,res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req,res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne({_id: id})

        if (!person) {
            res.status(422).json({ message: 'Pessoa não encontrada!' })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.patch('/:id', async (req,res) => {
    const id = req.params.id
    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved
    }

    try {
        const updatedPerson = await Person.updateOne({_id: id}, person)
    
        if (updatedPerson.matchedCount === 0 ) {
            res.status(422).json({ message: 'Pessoa não encontrada!' })
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({_id: id})

    if (!person) {
        res.status(422).json({ message: 'Pessoa não encontrada!' })
        return
    }

    try {
        await Person.deleteOne({_id: id})
        res.status(200).json({ message: 'Usuário excluído com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

module.exports = router