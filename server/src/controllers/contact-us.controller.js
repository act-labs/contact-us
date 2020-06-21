const Contact = require("../models/contact-us.model")

// Create and Save a new Message
exports.create = async(req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    try {
        await Contact.create(req.body)
        res.send({message: "Success!"})
    } catch (err) {
        console.error(err)
        res.status(500).send({
            message: err.message || "Some error occurred while saving your message."
        })
    }
}

// Retrieve all Messages from the database.
exports.findAll = async(_req, res) => {
    try {
        const contacts = await Contact.getAll()
        res.send(contacts)
    } catch (err) {
        console.error(err)
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving messages."
        })
    }
}
