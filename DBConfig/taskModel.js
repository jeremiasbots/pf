const { Schema, Model } = require("bsondb")

const tarea = new Schema({
    name: String,
    isComplete: Boolean
})

module.exports = new Model("taskSchema", tarea);