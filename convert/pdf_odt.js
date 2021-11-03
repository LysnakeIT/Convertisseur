const fs = require('fs');
const libre = require('libreoffice-convert');

/* Cette conversion n'est pas encore valide */

var PDFODT = function () {

    /**
     * Methode qui convertit un fichier PDF en un fichier ODT
     * @param input le fichier PDF à transformer
     * @param output le fichier transformé au format ODT
     * @returns promise une promise qui effectue la conversion si tout est conforme (type de fichier)
     */
    this.convert = function (input, output) {
        return new Promise(async function (resolve, reject) {
            await fs.readFileSync(input, (err, fileContent) => {
                if (err) {
                    reject(err);
                }
                resolve(write(fileContent, output))
            });
        })
    }
}

/**
 * Methode qui convertit les données passées en paramètre, puis créer et écrit dans le fichier passé en paramètre
 * @param fileContent les données à convertir
 * @param output le nom du fichier à créer
 */
function write (fileContent, output){
    const extend = '.pdf'
    libre.convert(fileContent, extend, undefined, (err, done) => {
        if (err) {
            console.log(`Une erreure est survenue lors de la conversion: ${err}`);
        }
        fs.writeFileSync(output, done);
    });
}
var convertPdfToOdt = new PDFODT();
module.exports = convertPdfToOdt;