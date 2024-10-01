# Étape 1 : Utiliser une image Node.js pour exécuter l'application
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier tout le code dans l'image Docker
COPY . .

# Exposer le port par défaut de Next.js
EXPOSE 3000

# Commande pour démarrer l'application Next.js
CMD ["npm", "run", "start"]
