const Discord = require("discord.js")
const client = new Discord.Client({ intents: 3276799 })
require("dotenv").config()
client.login(process.env.TOKEN)

client.on("ready", () => {
    console.log("Estoy encendido!")
})
/**
 * Creador del paquete pfcmd: JeremiasBots#2622 
 * Bot generado automaticamente por pfcmd
 */