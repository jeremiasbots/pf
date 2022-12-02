const { createPromptModule } = require("inquirer")
const taskSchema = require("../DBConfig/taskModel.js")

module.exports = {
    name: "removetasks",
    desc: "Remueve tareas",
    execute: async () => {
        taskSchema.all(async(datos) => {
            if(!datos){
                console.log("No hay datos")
                process.exit(0)
            } else {
                let da = datos.map(x => x.name)
                const prompt = createPromptModule()
                const answers = await prompt([
                    {
                        type: "checkbox",
                        name: "cbr",
                        message: "Selecciona las tareas",
                        choices: da
                    }
                ])
    
                if(answers.cbr.length <= 0){
                    console.log("Tienes que seleccionar alguna tarea")
                    process.exit(0)
                }
    
                answers.cbr.map(async(dato) => {
                    await taskSchema.remove(f => f.name === dato, (dataTasks) => {
                        if(!dataTasks){
                            console.log("Hubo un error")
                            process.exit(0)
                        }
                    })
                })
    
                console.log("Tareas eliminadas")
                process.exit(0)
            }
        })
    }
}