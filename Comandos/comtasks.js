const { createCheckBox } = require("../functions.js")

module.exports = {
    name: "completetasks",
    desc: "Completa tareas",
    execute: async () => {
        await createCheckBox();
    }
}