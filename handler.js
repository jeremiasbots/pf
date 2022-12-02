const { program } = require("commander");

program.version("2.5.0").name("pfcmd").description("Un CLI APP que sirve para crear bots y tareas")

const fs = require("fs")
const cmdCarpet = fs.readdirSync("./Comandos").filter(file => file.endsWith("js"))
cmdCarpet.map(file => {
    const cmd = require(`./Comandos/${file}`)
    const a = program.command(cmd.name).description(cmd.desc).action(cmd.execute)
    if(cmd.options){
        cmd.options.map(m => {
           if(!m.arg){
            a.option(`${m.abv}, ${m.name}`, `${m.desc}`)
            return;
           } else if(m.arg) {
            a.option(`${m.abv}, ${m.name} <${m.arg}>`, `${m.desc}`)
            return;
           }
           a.option(`${m.abv}, ${m.name}`, `${m.desc}`)
        }) 
    }
})

program.parse()