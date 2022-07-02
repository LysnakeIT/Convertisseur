var express = require('express');
var router = express.Router();
var png_ico = require('convert').png_ico
const fs = require("fs");

/**
 * Permet de faire fonctionner les promesses avec express
 * @param {*} fn
 * @returns
 */
function asyncMiddleware(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    }
}

/* Affiche la view ico */
router.get('/', function(req, res, next) {
    res.render('ico', { title: 'Convertisseur'});
});

/* Récupère le fichier fournit et le convertit puis le stocke localement de facon temporaire*/
router.post('/', asyncMiddleware(async (req, res, next) => {
    const file = req.files.fileUpload;
    const path = process.cwd() + "/temp/" + file.name; // On récupère le chemin de notre dossier qui va jouer le role de stockage locale (temporaire)

    await file.mv(path); // On met le fichier dans notre dossier
    const name = file.name.split(".");
    let newPath = process.cwd() + "/download/" + name[0] + ".ico"; // On récupère le chemin de notre dossier qui va jouer le role de stockage avent l'upload vers l'utilisateur (temporaire)
    await png_ico.convert(path, newPath); // On convertit le fichier
    res.redirect('/ico/download')
}));

/* On envoie le fichier à l'utilisateur */
router.get('/download', async function (req, res) {
    let filesD = fs.readdirSync(process.cwd() + "/download/"); // On recupère le chemin du dossier d'upload
    let filesT = fs.readdirSync(process.cwd() + "/temp/"); // On recupère le chemin du dossier de sauvegarde

    let file;
    let fileT;
    if (filesD[0] !== 'test.create' && filesT[0] !== 'test.create') {
        file = process.cwd() + "/download/" + filesD[0];
        fileT = process.cwd() + "/temp/" + filesT[0];
    } else {
        file = process.cwd() + "/download/" + filesD[1];
        fileT = process.cwd() + "/temp/" + filesT[1];
    }
    await res.download(file, (err) => {             // On envoie le nouveau fichier à l'utilisateur
        if (err) {
            console.log(err);
        }
        fs.unlink(file, (err) => {  // Ensuite on supprime le fichier envoyer de notre stockage local
            if (err) {
                console.log(err);
            }
            console.log('Fichier [' + file + '] supprimé!');
        });
        fs.unlink(fileT, (err) => { // Ensuite on supprime le fichier initial recu de notre stockage local
            if (err) {
                console.log(err);
            }
            console.log('Fichier [' + fileT + '] supprimé!');
        });
    })
});

module.exports = router;