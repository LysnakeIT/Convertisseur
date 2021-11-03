const webp = require('webp-converter');

var WEBPNG = function () {

    /**
     * Methode qui convertit un fichier WEBP en un fichier PNG
     * @param input le fichier WEBP à transformer
     * @param output le fichier transformé au format PNG
     * @returns promise une promise qui effectue la conversion si tout est conforme (type de fichier)
     */
    this.convert = function (input, output) {
        return new Promise(async function (resolve, reject) {
            const result = webp.dwebp(input, output, "-o",logging="-v")
            await result.then((response) => {
                console.log(response)
            }).then(resolve)
        })
    }
}
var convertWebpToPng = new WEBPNG();
module.exports = convertWebpToPng;