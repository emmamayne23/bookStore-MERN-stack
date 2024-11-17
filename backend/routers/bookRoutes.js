import express from "express"
import bookModel from "../models/bookModel.js"

const router = express.Router()

// route to save new book
router.post('/', async (req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: "All fields are required" })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await bookModel.create(newBook)
        return res.status(201).send(book)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

// route to get all books
router.get('/', async (req, res) => {
    try {
        
        const books = await bookModel.find({})
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

// route to get single book by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await bookModel.findById(id)
        return res.status(200).json(book)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

// route to update book by id
router.put('/:id', async (req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: "All fields are required" })
        }
        const { id } = req.params
        const result = await bookModel.findByIdAndUpdate(id, req.body, { new: true })
        if(!result) {
            return res.status(404).json({ message: `Book with id:${id} cannot be found` })
        }
        return res.status(200).send({message: `Book with id:${id} updated successfully`})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

// route to delete book by id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await bookModel.findByIdAndDelete(id)
        if(!result) {
            return res.status(404).json({ message: `Book with id:${id} cannot be found` })
        }
        return res.status(200).send({message: `Book with id:${id} deleted successfully`})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

export default router
