const fs = require("fs");
const jsonToCsv = require("csvjson");


var JSONCSV = function () {

    /**
     * Methode qui convertit un fichier JSON en un fichier CSV
     * @param input le fichier JSON à transformer
     * @param output le fichier transformé au format CSV
     * @returns promise une promise qui effectue la conversion si tout est conforme (type de fichier)
     */
    this.convert = function (input, output) {
        return new Promise(async function (resolve, reject) {
            await fs.readFile(input, 'utf-8', (err, fileContent) => {
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
    const csvData = jsonToCsv.toCSV(fileContent, {
        headers: 'key'
    });
    fs.writeFile(output, csvData, 'utf-8', (err) => {
        if (err) {
            throw (err);
        }
    });
}
var convertJSONToCSV = new JSONCSV();
module.exports = convertJSONToCSV;