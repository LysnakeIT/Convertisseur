const Jimp = require("jimp");

var PNGJPG = function () {

    /**
     * Methode qui convertit un fichier PNG en un fichier JPG
     * @param input le fichier PNG à transformer
     * @param output le fichier transformé au format JPG
     * @returns promise une promise qui effectue la conversion si tout est conforme (type de fichier)
     */
    this.convert = function (input, output) {
        return new Promise(async function (resolve, reject) {
            await Jimp.read(input, (err, value) => {
                value.write(output)
                if (err) reject(err)
                resolve(output)
            })
        })
    }
}
var convertPngToJpg = new PNGJPG();
module.exports = convertPngToJpg;