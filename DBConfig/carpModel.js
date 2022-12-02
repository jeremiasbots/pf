const { Schema, Model } = require("bsondb")

const carpeta = new Schema({
    random: String,
    numero: Number
})

module.exports = new Model("carpSchema", carpeta)