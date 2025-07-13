# 🎧 Node Stream Audio – Serveur de streaming audio & upload de fichiers

> Un serveur Express.js en TypeScript capable de diffuser des fichiers audio en streaming et de gérer l’upload de fichiers clients. Projet démontrant le traitement de flux binaires et le contrôle fin de la gestion de fichiers dans un backend Node.js.

---

## 🧭 Présentation

Ce projet permet :
- Le **streaming audio** progressif à la demande via HTTP
- L’**upload de fichiers audio** par les utilisateurs
- Le **stockage local** des fichiers uploadés sur le serveur
- La gestion de l’accès aux ressources audio de manière simple et efficace

Il illustre comment manipuler des **streams Node.js**, traiter des **fichiers binaires**, et proposer une API REST performante pour des médias audio.

---

## 🧰 Stack technique

| Composant           | Technologie                  |
|--------------------|-------------------------------|
| Langage            | TypeScript                    |
| Serveur web        | Express.js                    |
| Traitement fichiers| `fs`, `stream`, `multer`      |
| Upload/Download    | REST HTTP + gestion des headers|
| Stockage           | Système de fichiers local     |
| Tests & structure  | En cours / à compléter        |

---

## 📦 Fonctionnalités

- ✅ **Streaming audio** via `res.pipe()` avec support des headers `Range`
- ✅ **Upload de fichiers audio** (MP3, WAV…) par les utilisateurs via `POST /upload`
- ✅ **Stockage serveur local** des fichiers uploadés
- 📁 Dossier `/uploads` configurable
- 🔒 Authentification/API key (à venir)
- 🧱 Respect des principes **SOLID**, code modulaire
