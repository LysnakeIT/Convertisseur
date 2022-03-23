const HummusRecipe = require('hummus-recipe');


var encryptPDF = function () {

    /**
     * Methode qui chiffre un fichier pdf avec un mot de passe
     * @param input le fichiers pdf à chiffrer
     * @param mdp le password
     * @param output le fichier chiffre
     * @returns promise une promise qui effectue la conversion si tout est conforme (type de fichier)
     */
    this.convert = function (input, mdp, output) {
        return new Promise(async function (resolve, reject) {
            const pdfDoc = new HummusRecipe(input, output);

            resolve(pdfDoc
                .encrypt({
                    userPassword: mdp,
                    ownerPassword: mdp,
                    userProtectionFlag: 4
                })
                .endPDF())
        })
    }
}
var encryptaPDF = new encryptPDF();
module.exports = encryptaPDF;