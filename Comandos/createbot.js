const carpSchema = require("../DBConfig/carpModel.js")

module.exports = {
    name: "createbot",
    desc: "Crea un bot automaticamente generado en el directorio actual",
    options: [
        {
            name: "--namecarpet",
            abv: "-nc",
            desc: "Nombre de la carpeta",
            arg: "carpeta"
        }
    ],
    execute: async (options) => {
        const m = carpSchema.buildModel({
            random: "pc",
            numero: 0
        })
        await m.save();
        if(process.platform === "linux"){
            const path = require("path")
        carpSchema.findOne((modelo) => modelo.random === "pc", async(datos) => {
            if(!datos){
                console.log("Hubo un error")
                process.exit()
            }
            const fs = require("fs-extra")
            if(options.namecarpet !== undefined){
              try {
                  fs.copySync(path.resolve(__dirname, "bot"), path.join(process.cwd(), `${options.namecarpet}`))
                  console.log(`Bot creado en: ${path.join(process.cwd(), `${options.namecarpet}`)}`)
              } catch (error) {
                  console.log(`Ocurrio un error:\n${error}`)
                  process.exit(0)
              }
            } else {
              try {
              fs.copySync(path.resolve(__dirname, "bot"), path.join(process.cwd(), `autogenbot_key;rUIKX${datos.numero}`))
              console.log(`Bot creado en: ${path.join(process.cwd(), `autogenbot_key;rUIKX${datos.numero}`)}`)
              } catch (error) {
                  console.log(`Ocurrio un error:\n${error}`)
                  process.exit(0)
              }
            }
            datos.numero = Math.floor(datos.numero + 1)
            await datos.save();
            process.exit(0)
        })
    } else if(process.platform === "win32"){
        const path = require("path/win32")
        carpSchema.findOne((modelo) => modelo.random === "pc", async(datos) => {
            if(!datos){
                console.log("Hubo un error")
                process.exit()
            }
            const fs = require("fs-extra")
            if(options.namecarpet !== undefined){
              try {
                  fs.copySync(path.resolve(__dirname, "bot"), path.join(process.cwd(), `${options.namecarpet}`))
                  console.log(`Bot creado en: ${path.join(process.cwd(), `${options.namecarpet}`)}`)
              } catch (error) {
                  console.log(`Ocurrio un error:\n${error}`)
                  process.exit(0)
              }
            } else {
              try {
              fs.copySync(path.resolve(__dirname, "bot"), path.join(process.cwd(), `autogenbot_key;rUIKX${datos.numero}`))
              console.log(`Bot creado en: ${path.join(process.cwd(), `autogenbot_key;rUIKX${datos.numero}`)}`)
              } catch (error) {
                  console.log(`Ocurrio un error:\n${error}`)
                  process.exit(0)
              }
            }
            datos.numero = Math.floor(datos.numero + 1)
            await datos.save();
            process.exit(0)
        })
    }
    }
}