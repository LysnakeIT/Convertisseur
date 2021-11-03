const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const ffprobe = require("@ffprobe-installer/ffprobe");

const ffmpeg = require("fluent-ffmpeg")()
    .setFfprobePath(ffprobe.path)
    .setFfmpegPath(ffmpegInstaller.path);

var MP4GIF = function () {

    /**
     * Methode qui convertit un fichier MP4 en un fichier GIF
     * @param input le fichier MP4 à transformer
     * @param output le fichier transformé au format GIF
     * @returns promise une promise qui effectue la conversion si tout est conforme (type de fichier)
     */
    this.convert = function (input, output){
        return new Promise(async function (resolve, reject) {
            await ffmpeg
                .input(input)
                .output(output)
                .on("end", () => {
                    console.log("Conversion terminé")
                    resolve()
                })
                .on("error", (e) => reject(e))
                .run();
        })
    }
}
var convertMP4ToGIF = new MP4GIF();
module.exports = convertMP4ToGIF