// ===================================
// CE FICHIER CONTIENT TOUT LE BOT
// ===================================

// 1. ON IMPORTE CE DONT ON A BESOIN
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const config = require('./config');

// ===================================
// 2. ON DÉMARRE LE BOT
// ===================================
async function startBot() {
    console.log("🚀 Démarrage du bot...");
    
    // Connexion
    const { state, saveCreds } = await useMultiFileAuthState('./sessions');
    
    const sock = makeWASocket({
        printQRInTerminal: false,
        auth: state
    });

    // ===================================
    // 3. TOUTES LES COMMANDES ICI (150)
    // ===================================
    
    // Je crée une boîte pour ranger les commandes
    const commands = new Map();

    // ---------- COMMANDE 1 : MENU ----------
    commands.set('menu', async (sock, msg, args) => {
        const menuText = `╔══════════════════════════╗
║   🤖 ${config.botName}    
╠══════════════════════════╣
║  Commandes disponibles :  
║  
║  📥 .play  - Musique     
║  🎨 .sticker - Sticker    
║  🤖 .gpt   - IA          
║  🎮 .game  - Jeux        
║  👥 .group - Groupe      
║  ℹ️ .ping  - Test        
║  
╠══════════════════════════╣
║  Total: 150 commandes !   
╚══════════════════════════╝`;
        
        await sock.sendMessage(msg.chat, { text: menuText });
    });

    // ---------- COMMANDE 2 : PING ----------
    commands.set('ping', async (sock, msg) => {
        const start = Date.now();
        await sock.sendMessage(msg.chat, { text: "⚡ Calcul..." });
        const end = Date.now();
        await sock.sendMessage(msg.chat, { text: `📶 Réponse: ${end - start}ms` });
    });

    // ---------- COMMANDE 3 : ALIVE ----------
    commands.set('alive', async (sock, msg) => {
        await sock.sendMessage(msg.chat, { 
            text: `✅ ${config.botName} est en ligne !` 
        });
    });

    // ---------- COMMANDE 4 : PLAY ----------
    commands.set('play', async (sock, msg, args) => {
        if (!args.length) {
            return sock.sendMessage(msg.chat, { 
                text: "❌ Exemple: .play despacito" 
            });
        }
        await sock.sendMessage(msg.chat, { 
            text: `🔍 Recherche de "${args.join(' ')}"...` 
        });
        // Le code pour vraiment télécharger viendra plus tard
    });

    // ---------- COMMANDE 5 : STICKER ----------
    commands.set('sticker', async (sock, msg) => {
        await sock.sendMessage(msg.chat, { 
            text: "🎨 Commande sticker (en développement)" 
        });
    });

    // ---------- COMMANDE 6 : GPT ----------
    commands.set('gpt', async (sock, msg, args) => {
        if (!args.length) {
            return sock.sendMessage(msg.chat, { 
                text: "❌ Exemple: .gpt Bonjour" 
            });
        }
        await sock.sendMessage(msg.chat, { 
            text: `🤔 Je réfléchis à: ${args.join(' ')}` 
        });
    });

    // ---------- COMMANDE 7 : TICTACTOE ----------
    commands.set('tictactoe', async (sock, msg) => {
        await sock.sendMessage(msg.chat, { 
            text: "🎮 Jeu du morpio (bientôt disponible)" 
        });
    });

    // ---------- COMMANDE 8 : TAGALL ----------
    commands.set('tagall', async (sock, msg) => {
        await sock.sendMessage(msg.chat, { 
            text: "👥 Mentionner tous les membres (bientôt)" 
        });
    });

    // ---------- COMMANDE 9 : WEATHER ----------
    commands.set('weather', async (sock, msg, args) => {
        if (!args.length) {
            return sock.sendMessage(msg.chat, { 
                text: "❌ Exemple: .weather Dakar" 
            });
        }
        await sock.sendMessage(msg.chat, { 
            text: `🌤️ Météo pour ${args.join(' ')}: 30°C, Ensoleillé` 
        });
    });

    // ---------- COMMANDE 10 : TRANSLATE ----------
    commands.set('translate', async (sock, msg, args) => {
        if (!args.length) {
            return sock.sendMessage(msg.chat, { 
                text: "❌ Exemple: .translate Bonjour" 
            });
        }
        await sock.sendMessage(msg.chat, { 
            text: `🌍 Traduction: ${args.join(' ')} (en anglais: Hello)` 
        });
    });

    // ---------- COMMANDE 11 : QUOTE ----------
    commands.set('quote', async (sock, msg) => {
        const quotes = [
            "La vie est belle",
            "Rêve grand",
            "Ne jamais abandonner",
            "Le succès vient avec le travail"
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        await sock.sendMessage(msg.chat, { text: `💬 "${randomQuote}"` });
    });

    // ---------- COMMANDE 12 : FACT ----------
    commands.set('fact', async (sock, msg) => {
        const facts = [
            "Les abeilles peuvent voler jusqu'à 24 km/h",
            "Un groupe de flamants roses s'appelle un 'colonie'",
            "Le miel ne se périme jamais"
        ];
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        await sock.sendMessage(msg.chat, { text: `📚 Fait: ${randomFact}` });
    });

    // ---------- COMMANDE 13 : JOKE ----------
    commands.set('joke', async (sock, msg) => {
        const jokes = [
            "Pourquoi les plongeurs plongent-ils toujours en arrière ? Parce que sinon ils tombent dans le bateau !",
            "Quel est le comble pour un électricien ? De ne pas être au courant",
            "Que dit un œuf en tombant ? Aïe, j'ai la coque fêlée !"
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        await sock.sendMessage(msg.chat, { text: `😄 Blague: ${randomJoke}` });
    });

    // ---------- COMMANDE 14 : QRCODE ----------
    commands.set('qrcode', async (sock, msg, args) => {
        if (!args.length) {
            return sock.sendMessage(msg.chat, { 
                text: "❌ Exemple: .qrcode Bonjour" 
            });
        }
        await sock.sendMessage(msg.chat, { 
            text: `📱 QR Code pour: ${args.join(' ')} (génération simulée)` 
        });
    });

    // ---------- COMMANDE 15 : SHORTURL ----------
    commands.set('shorturl', async (sock, msg, args) => {
        if (!args.length) {
            return sock.sendMessage(msg.chat, { 
                text: "❌ Exemple: .shorturl https://google.com" 
            });
        }
        await sock.sendMessage(msg.chat, { 
            text: `🔗 Lien raccourci: https://tinyurl.com/example` 
        });
    });

    // ---------- COMMANDE 16 : CALC ----------
    commands.set('calc', async (sock, msg, args) => {
        if (!args.length) {
            return sock.sendMessage(msg.chat, { 
                text: "❌ Exemple: .calc 2+2" 
            });
        }
        try {
            const result = eval(args.join(' '));
            await sock.sendMessage(msg.chat, { 
                text: `🧮 Résultat: ${result}` 
            });
        } catch {
            await sock.sendMessage(msg.chat, { 
                text: "❌ Calcul invalide" 
            });
        }
    });

    // ---------- COMMANDE 17 : INFO ----------
    commands.set('info', async (sock, msg) => {
        await sock.sendMessage(msg.chat, { 
            text: `ℹ️ Bot: ${config.botName}\nVersion: 1.0.0\nCommandes: 150` 
        });
    });

    // ---------- COMMANDE 18 : OWNER ----------
    commands.set('owner', async (sock, msg) => {
        await sock.sendMessage(msg.chat, { 
            text: `👑 Propriétaire: ${config.ownerNumber}` 
        });
    });

    // ---------- COMMANDE 19 : MODE ----------
    commands.set('mode', async (sock, msg) => {
        await sock.sendMessage(msg.chat, { 
            text: "⚙️ Mode: Public" 
        });
    });

    // ---------- COMMANDE 20 : RESTART ----------
    commands.set('restart', async (sock, msg) => {
        await sock.sendMessage(msg.chat, { 
            text: "🔄 Redémarrage du bot..." 
        });
    });

    // Ici on pourrait continuer jusqu'à 150 commandes
    // Mais pour l'exemple, on s'arrête à 20
    // Tu peux copier ce modèle pour ajouter les autres

    console.log(`✅ ${commands.size} commandes chargées`);

    // ===================================
    // 4. ÉCOUTER LES MESSAGES
    // ===================================
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const m = messages[0];
        if (!m.message) return;
        
        // Récupérer le texte du message
        const text = m.message.conversation || 
                     m.message.extendedTextMessage?.text || '';
        
        // Ignorer les messages du bot
        if (m.key.fromMe) return;
        
        // Vérifier si le message commence par le préfixe (.)
        if (!text.startsWith(config.prefix)) return;
        
        // Extraire la commande
        const args = text.slice(config.prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        
        // Exécuter la commande si elle existe
        if (commands.has(command)) {
            try {
                await commands.get(command)(sock, m, args);
            } catch (error) {
                console.log("Erreur:", error);
                await sock.sendMessage(m.key.remoteJid, { 
                    text: "❌ Erreur lors de l'exécution" 
                });
            }
        }
    });

    // ===================================
    // 5. CODE PAIRING
    // ===================================
    setTimeout(async () => {
        try {
            const code = await sock.requestPairingCode(config.ownerNumber);
            console.log("\n🔐 CODE PAIRING :", code);
            console.log("📱 Entre ce code dans WhatsApp\n");
        } catch (e) {
            console.log("❌ Erreur pairing:", e);
        }
    }, 3000);
}

// Démarrer le bot
startBot();