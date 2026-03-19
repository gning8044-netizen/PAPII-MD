module.exports = {
    // TES INFORMATIONS (change ce qui est entre "")
    botName: "𝕯𝖊𝖛 𝕾𝖍𝖆𝖉𝖔𝖜 𝕿𝖊𝖈𝖍",
    ownerNumber: "221769325203", // Mets TON numéro ICI !
    
    // TES LIENS (tu changeras plus tard)
    mainVideos: [
        "https://files.catbox.moe/video1.mp4",
        "https://files.catbox.moe/video2.mp4",
        "https://files.catbox.moe/video3.mp4"
    ],
    
    // Le symbole des commandes
    prefix: ".",
    
    // Fonction pour choisir une vidéo au hasard
    randomVideo: (videos) => {
        return videos[Math.floor(Math.random() * videos.length)];
    }
};