# 🤖 𝕯𝖊𝖛 𝕾𝖍𝖆𝖉𝖔𝖜 𝕿𝖊𝖈𝖍 - BOT WHATSAPP

Bot WhatsApp avec 150+ commandes pour gérer vos groupes, télécharger des médias, jouer à des jeux et plus encore !

---

## 📱 COMMENT CONNECTER TON BOT

### Étape 1 : Obtiens le code pairing
1. Va sur le site de connexion :  
   **🔗 https://tonprojet.github.io/DevShadowBot/pair.html**
2. Entre ton numéro WhatsApp (ex: 771234567)
3. Clique sur "GÉNÉRER LE CODE"
4. Un code à 8 caractères apparaît (ex: ABCD1234)

### Étape 2 : Connecte ton WhatsApp
1. Ouvre WhatsApp sur ton téléphone
2. Va dans **Menu** (⋮) → **Appareils connectés**
3. Clique sur **"Connecter avec le numéro"**
4. Entre le code que tu as reçu
5. Attends quelques secondes
6. ✅ Félicitations ! Ton bot est connecté !

---

## ⚡ COMMANDES PRINCIPALES

### 👥 Commandes de Groupe
| Commande | Description |
|----------|-------------|
| `.tagall` | Mentionne tous les membres |
| `.hidetag <texte>` | Mentionne tous avec un message caché |
| `.kick @user` | Retire un membre du groupe |
| `.promote @user` | Nomme un membre admin |
| `.demote @user` | Retire les droits admin |
| `.delete` | Supprime le message du bot |
| `.groupinfo` | Affiche les infos du groupe |
| `.link` | Donne le lien d'invitation du groupe |

### ℹ️ Commandes d'Information
| Commande | Description |
|----------|-------------|
| `.menu` | Affiche le menu principal |
| `.ping` | Teste la rapidité du bot |
| `.alive` | Vérifie si le bot est en ligne |
| `.owner` | Affiche le propriétaire du bot |
| `.repo` | Affiche les infos du bot |

### 🎮 Commandes de Jeux
| Commande | Description |
|----------|-------------|
| `.tictactoe` | Joue au morpio |
| `.dice` | Lance un dé |
| `.trivia` | Joue au quiz |

### 🛠️ Commandes d'Outils
| Commande | Description |
|----------|-------------|
| `.weather <ville>` | Météo d'une ville |
| `.translate <texte>` | Traduit un texte |
| `.qrcode <texte>` | Génère un QR code |

---

## 📦 INSTALLATION (pour développeurs)

### Prérequis
- Node.js (version 18 ou supérieure)
- Un compte WhatsApp

### Installation
```bash
# 1. Clone le repository
git clone https://github.com/tonpseudo/DevShadowBot.git

# 2. Entre dans le dossier
cd DevShadowBot

# 3. Installe les dépendances
npm install

# 4. Lance le bot
node index.js
