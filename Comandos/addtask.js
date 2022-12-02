const { createInput } = require("../functions.js")
const taskSchema = require("../DBConfig/taskModel.js")

module.exports = {
    name: "addtask",
    desc: "Añade una tarea",
    execute: async () => {
        const answers = await createInput("crt", "Nombre de la tarea:")
    if(answers.crt.length < 1){
        console.log("La tarea tiene que tener al menos 1 caracter")
        return;
    }
    const s = taskSchema.buildModel({ 
        name: answers.crt,
        isComplete: false
    })
    s.save();
    console.log("Tarea puesta!")
    }
}