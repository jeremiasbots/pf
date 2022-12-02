const { createPromptModule } = require("inquirer")
const Schema = require("./DBConfig/taskModel.js")

async function createList(){
    const prompt = createPromptModule()
    const list = await prompt([{
        type: "list",
        name: "lista",
        message: "Elige una función",
        choices: [{ name: "Crear un bot", value: "cub" }, { name: "Crear tareas", value: "ct" }, { name: "Ver tareas", value: "vet" }, { name: "Completar tareas", value: "cmt" }, { name: "Remover tarea", value: "yer" }]
    }])

    return list;
}

async function createInput(nombre, mensaje){
    const prompt = createPromptModule();
    const input = await prompt([{
        type: "input",
        name: nombre,
        message: mensaje
    }])

    return input;
}

async function createCheckBox(){
    Schema.all(async(datos) => {
        if(!datos){
            console.log("No hay tareas")
            return;
        } else {
            let da = datos.filter(x => x.isComplete === false)

            if(da.length === 0){
                console.log("Todas las tareas ya están completadas")
                return;
            }

            da = da.map(x => x.name)

            const prompt = createPromptModule();

            await prompt({
                    type: "checkbox",
                    name: "chkb",
                    message: "Selecciona las tareas",
                    choices: da
                }).then(async(answers) => {
                    answers.chkb.map(async(dato) => {
                        const ok = await Schema.findOne(c => c.name === dato, async(datos) => {
                            if(datos.isComplete === true){
                                console.log("Alguna de las tareas ya esta completada")
                                process.exit()
                            }
                            datos.isComplete = true
                            await datos.save();
                        })
                    })
                    console.log("Tareas completadas!")
                        process.exit()
                })
        }
    })
    
}

module.exports = {
    createList,
    createInput,
    createCheckBox
}