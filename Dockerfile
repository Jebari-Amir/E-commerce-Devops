# Étape 1 : Utiliser une image Node.js officielle pour la construction
FROM node:16 AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code dans le conteneur
COPY . .

# Construire l'application Next.js
RUN npm run build

# Étape 2 : Image de production
FROM node:16 AS production

# Définir le répertoire de travail pour l'image de production
WORKDIR /app

# Copier les fichiers nécessaires depuis l'étape de construction
COPY --from=builder /app ./

# Installer uniquement les dépendances nécessaires pour la production
RUN npm install --production

# Exposer le port de l'application (3000 pour une app Next.js)
EXPOSE 3000

# Démarrer l'application Next.js en mode production
CMD ["npm", "run", "start"]
