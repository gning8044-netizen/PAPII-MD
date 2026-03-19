const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const config = require('./config');

console.log('🚀 Démarrage du bot...');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./sessions');
    
    const sock = makeWASocket({
        printQRInTerminal: false,
        auth: state
    });

    // ============================================
    // TOUTES LES COMMANDES ICI
    // ============================================
    
    const commands = new Map();

    // ---- COMMANDE MENU ----
    commands.set('menu', async (sock, msg) => {
        const menuText = `╔══════════════════════════╗
║   🤖 ${config.botName}    
╠══════════════════════════╣
║  📋 LISTE DES COMMANDES  
║  
║  👥 GROUPES
║  ├─ .tagall
║  ├─ .hidetag <texte>
║  ├─ .kick @user
║  ├─ .promote @user
║  ├─ .demote @user
║  ├─ .delete
║  ├─ .groupinfo
║  └─ .link
║  
║  ℹ️ INFO
║  ├─ .ping
║  ├─ .alive
║  ├─ .owner
║  └─ .repo
║  
║  🎮 JEUX
║  ├─ .tictactoe
║  ├─ .dice
║  └─ .trivia
║  
║  🛠️ OUTILS
║  ├─ .weather
║  ├─ .translate
║  └─ .qrcode
╠══════════════════════════╣
║  👑 ${config.ownerNumber}
╚══════════════════════════╝`;
        
        await sock.sendMessage(msg.chat, { text: menuText });
    });

    // ---- COMMANDE PING ----
    commands.set('ping', async (sock, msg) => {
        const start = Date.now();
        await sock.sendMessage(msg.chat, { text: '⚡ Ping...' });
        const end = Date.now();
        await sock.sendMessage(msg.chat, { text: `📶 ${end - start}ms` });
    });

    // ---- COMMANDE ALIVE ----
    commands.set('alive', async (sock, msg) => {
        await sock.sendMessage(msg.chat, { text: `✅ ${config.botName} est en ligne !` });
    });

    // ---- COMMANDE OWNER ----
    commands.set('owner', async (sock, msg) => {
        await sock.sendMessage(msg.chat, { text: `👑 Propriétaire: ${config.ownerNumber}` });
    });

    // ---- COMMANDE REPO ----
    commands.set('repo', async (sock, msg) => {
        await sock.sendMessage(msg.chat, { text: `📦 Bot ${config.botName} v${config.version}` });
    });

    // ---- COMMANDE TAGALL ----
    commands.set('tagall', async (sock, msg) => {
        const groupMetadata = await sock.groupMetadata(msg.chat);
        const participants = groupMetadata.participants;
        let text = '👥 Mention de tous:\n\n';
        
        for (let p of participants) {
            text += `@${p.id.split('@')[0]}\n`;
        }
        
        await sock.sendMessage(msg.chat, { 
            text: text,
            mentions: participants.map(p => p.id)
        });
    });

    // ---- COMMANDE HIDETAG ----
    commands.set('hidetag', async (sock, msg, args) => {
        const text = args.join(' ') || ' ';
        const groupMetadata = await sock.groupMetadata(msg.chat);
        const participants = groupMetadata.participants;
        
        await sock.sendMessage(msg.chat, { 
            text: text,
            mentions: participants.map(p => p.id)
        });
    });

    // ---- COMMANDE KICK ----
    commands.set('kick', async (sock, msg, args) => {
        const user = msg.mentioned[0];
        if (!user) return sock.sendMessage(msg.chat, { text: '❌ Mentionne la personne' });
        
        await sock.groupParticipantsUpdate(msg.chat, [user], 'remove');
        await sock.sendMessage(msg.chat, { text: `✅ @${user.split('@')[0]} retiré`, mentions: [user] });
    });

    // ---- COMMANDE PROMOTE ----
    commands.set('promote', async (sock, msg, args) => {
        const user = msg.mentioned[0];
        if (!user) return sock.sendMessage(msg.chat, { text: '❌ Mentionne la personne' });
        
        await sock.groupParticipantsUpdate(msg.chat, [user], 'promote');
        await sock.sendMessage(msg.chat, { text: `✅ @${user.split('@')[0]} promu admin`, mentions: [user] });
    });

    // ---- COMMANDE DEMOTE ----
    commands.set('demote', async (sock, msg, args) => {
        const user = msg.mentioned[0];
        if (!user) return sock.sendMessage(msg.chat, { text: '❌ Mentionne la personne' });
        
        await sock.groupParticipantsUpdate(msg.chat, [user], 'demote');
        await sock.sendMessage(msg.chat, { text: `✅ @${user.split('@')[0]} n'est plus admin`, mentions: [user] });
    });

    // ---- COMMANDE DELETE ----
    commands.set('delete', async (sock, msg) => {
        if (!msg.quoted) return sock.sendMessage(msg.chat, { text: '❌ Réponds au message' });
        await sock.sendMessage(msg.chat, { delete: msg.quoted.key });
    });

    // ---- COMMANDE GROUPINFO ----
    commands.set('groupinfo', async (sock, msg) => {
        const groupMetadata = await sock.groupMetadata(msg.chat);
        const text = `📊 Infos du groupe:\n📌 Nom: ${groupMetadata.subject}\n👥 Membres: ${groupMetadata.participants.length}`;
        await sock.sendMessage(msg.chat, { text: text });
    });

    // ---- COMMANDE LINK ----
    commands.set('link', async (sock, msg) => {
        const inviteCode = await sock.groupInviteCode(msg.chat);
        await sock.sendMessage(msg.chat, { text: `🔗 https://chat.whatsapp.com/${inviteCode}` });
    });

    // ---- COMMANDE WEATHER ----
    commands.set('weather', async (sock, msg, args) => {
        if (!args.length) return sock.sendMessage(msg.chat, { text: '❌ Exemple: .weather Dakar' });
        await sock.sendMessage(msg.chat, { text: `🌤️ Météo pour ${args.join(' ')}: 30°C` });
    });

    // ---- COMMANDE TRANSLATE ----
    commands.set('translate', async (sock, msg, args) => {
        if (!args.length) return sock.sendMessage(msg.chat, { text: '❌ Exemple: .translate Bonjour' });
        await sock.sendMessage(msg.chat, { text: `🌍 Traduction: ${args.join(' ')} (simulation)` });
    });

    // ---- COMMANDE QRCODE ----
    commands.set('qrcode', async (sock, msg, args) => {
        if (!args.length) return sock.sendMessage(msg.chat, { text: '❌ Exemple: .qrcode Hello' });
        await sock.sendMessage(msg.chat, { text: `📱 QR Code généré pour: ${args.join(' ')}` });
    });

    // ---- COMMANDE TICTACTOE ----
    commands.set('tictactoe', async (sock, msg) => {
        await sock.sendMessage(msg.chat, { text: '🎮 Jeu du morpio (simulation)' });
    });

    // ---- COMMANDE DICE ----
    commands.set('dice', async (sock, msg) => {
        const dice = Math.floor(Math.random() * 6) + 1;
        await sock.sendMessage(msg.chat, { text: `🎲 Le dé donne: ${dice}` });
    });

    // ---- COMMANDE TRIVIA ----
    commands.set('trivia', async (sock, msg) => {
        await sock.sendMessage(msg.chat, { text: '🎮 Quiz (simulation)' });
    });

    console.log(`✅ ${commands.size} commandes chargées`);

    // ============================================
    // ÉCOUTER LES MESSAGES
    // ============================================
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const m = messages[0];
        if (!m.message) return;
        
        const text = m.message.conversation || m.message.extendedTextMessage?.text || '';
        
        if (m.key.fromMe) return;
        if (!text.startsWith(config.prefix)) return;
        
        const args = text.slice(config.prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        
        if (commands.has(command)) {
            try {
                await commands.get(command)(sock, m, args);
            } catch (error) {
                console.log('Erreur:', error);
            }
        }
    });

    // ============================================
    // CODE PAIRING
    // ============================================
    setTimeout(async () => {
        try {
            const code = await sock.requestPairingCode(config.ownerNumber);
            console.log('\n🔐 CODE PAIRING:', code);
            console.log('📱 Entre ce code dans WhatsApp\n');
        } catch (e) {
            console.log('❌ Erreur pairing');
        }
    }, 3000);
}

startBot();