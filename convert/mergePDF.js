const fs = require("fs");
const merge = require('pdf-merger-js')


var mergePDF = function () {

    /**
     * Methode qui fusionne des pdf en un seul pdf
     * @param input les fichiers pdf à fusionner
     * @param output le fichier de fusion
     * @returns promise une promise qui effectue la conversion si tout est conforme (type de fichier)
     */
    this.convert = function (input, output) {
        return new Promise(async function (resolve, reject) {
            var merger = new merge();
            resolve((async () => {
                for (let i = 0; i < input.length; i++) {
                    merger.add(input[i]);
                }
                await merger.save(output);
            })()
            )
        })
    }
}
var merge2PDF = new mergePDF();
module.exports = merge2PDF;