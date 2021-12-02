var express = require('express');
var router = express.Router();
var merge_pdf = require('convert').merge_pdf
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

/* Affiche la view fusion */
router.get('/', function (req, res, next) {
    res.render('fusion', { title: 'Convertisseur' });
});

/* Récupère le fichier fournit et le convertit puis le stocke localement de facon temporaire*/
router.post('/', asyncMiddleware(async (req, res, next) => {
    const file = req.files.fileUpload;
    const name = file[0].name.split(".");
    const newPath = process.cwd() + "/download/" + name[0] + ".pdf"; // On récupère le chemin de notre dossier qui va jouer le role de stockage avent l'upload vers l'utilisateur (temporaire)
    var path;
    var array = new Array()
    for (let i = 0; i < file.length; i++) {
        path = process.cwd() + "/temp/" + file[i].name; // On récupère le chemin de notre dossier qui va jouer le role de stockage locale (temporaire)
        array.push(path)
        await file[i].mv(path); // On met le fichier dans notre dossier
    }
    await merge_pdf.convert(array, newPath); // On convertit le fichier
    res.redirect('/fusion/download')
}));

/* On envoie le fichier à l'utilisateur */
router.get('/download', async function (req, res) {
    let filesD = fs.readdirSync(process.cwd() + "/download/"); // On recupère le chemin du dossier d'upload
    let filesT = fs.readdirSync(process.cwd() + "/temp/"); // On recupère le chemin du dossier de sauvegarde

    let file = process.cwd() + "/download/" + filesD[0];
    var fileT = new Array()
    fs.readdir(process.cwd() + "/temp/", (err, files) => {
        console.log(files)
        for (let i = 0; i < files.length; i++) {
            fileT.push(process.cwd() + "/temp/" + files[i])
        }
    });
    await res.download(file, (err) => { // On envoie le nouveau fichier à l'utilisateur
        if (err) {
            console.log(err);
        }
        fs.unlink(file, (err) => {  // Ensuite on supprime le fichier envoyer de notre stockage local
            if (err) {
                console.log(err);
            }
            console.log('Fichier [' + file + '] supprimé!');
        });
        for (let i = 0; i < fileT.length; i++) {
            fs.unlink(fileT[i], (err) => { // Ensuite on supprime le fichier initial recu de notre stockage local
                if (err) {
                    console.log(err);
                }
                console.log('Fichier [' + fileT[i] + '] supprimé!');
            });
        }
    })
});

module.exports = router;