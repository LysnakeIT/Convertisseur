const fs = require('fs');
const Jimp = require("jimp");
const ico = require('@fiahfy/ico-convert');

var PNGICO = function () {

    /**
     * Methode qui convertit un fichier PNG en un fichier ICO
     * @param input le fichier PNG à transformer
     * @param output le fichier transformé au format ICO
     * @returns promise une promise qui effectue la conversion si tout est conforme (type de fichier)
     */
    this.convert = async function (input, output) {
      return new Promise(async function (resolve, reject) {
        await Jimp.read(input, (err, value) => {
          value.resize(256, 256).quality(60).write(output)
          console.log("Conversion en cours...")
          if (err) reject(err)
        }).then(resolve(convertToIco(output)))
      })
    }
}

async function convertToIco(output) {
  console.log("Conversi")
  return new Promise(async function (resolve, reject) {
    setTimeout(() => {
      const buf = fs.readFileSync(output)
      ico.convert(buf).then((data) => {
        resolve(fs.writeFileSync(output.split(".")[0] + ".ico", data))
        console.log("Conversion terminée!")
      })
    }, 5000)
  })
}

var convertPngToIco = new PNGICO()
module.exports = convertPngToIco;
