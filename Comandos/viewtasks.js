const taskSchema = require("../DBConfig/taskModel.js")

module.exports = {
    name: "viewtasks",
    desc: "Ve las tareas",
    execute: () => {
        taskSchema.all((datos) => {
            if(!datos){
                console.log("No hay tareas")
                process.exit()
            } else {
                const si = datos.map(x => {
                    let ok;
                    if(x.isComplete === false){
                        ok = "No"
                    } else if(x.isComplete === true){
                        ok = "Si"
                    }
    
                    const obj = {
                        name: x.name,
                        isComplete: ok
                    }
    
                    return obj;
                })
    
                const xd = si.map(m => `Nombre: ${m.name}  Está completada: ${m.isComplete}`).join("\n")
    
                console.log(xd)
                process.exit()
            }
        })
    }
}