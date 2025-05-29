const BookInventory = require('../schema/BookSchema.js')
const createBook = async (req, res) => {
    try {
        const book = await BookInventory.create(req.body)
        return res.status(201).json({ data: book })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getAllBooks = async (req, res) => {
    try {
        const books = await BookInventory.findAll()
        return res.status(200).json({ length: books.length, data: books })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getSingleBook = async (req, res) => {
    try {
        const { id } = req.params
        const book = await BookInventory.findOne({ where: { id } })
        if (!book) {
            return res.status(404).json({ message: `No book found with ID: ${id}` })
        }
        return res.status(200).json({ data: book })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const updateBook = async (req, res) => {
    try {
        const { id } = req.params
        let book = await BookInventory.findOne({ where: { id } })
        if (!book) {
            return res.status(404).json({ message: `No book found with ID: ${id}` })
        }
        book = await book.update(req.body)
        return res.status(200).json({ data: book })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteSingleBook = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await BookInventory.destroy({ where: { id } })
        if (!deleted) {
            return res.status(404).json({ message: `No book found with ID: ${id}` })
        }
        return res.status(204).json({ data: "Book deleted" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteAllBooks = async (req, res) => {
    try {
        await BookInventory.destroy({ where: {} })
        return res.status(204).json({ data: "Books deleted" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteSingleBook,
    deleteAllBooks
}