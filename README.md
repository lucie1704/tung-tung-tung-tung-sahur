# Chat en temps réel avec Next.js et NestJS

Un chat en temps réel moderne avec authentification, thèmes personnalisables et notifications de frappe.

## Fonctionnalités

- 💬 Chat en temps réel avec Socket.IO
- 🔐 Authentification (login/register)
- 🎨 Thèmes personnalisables pour chaque utilisateur
- ✍️ Indication "en train d'écrire"
- 📱 Interface responsive
- 🌙 Thème sombre/clair
- 🔄 Scroll automatique vers les nouveaux messages

## Prérequis

- Node.js (v18 ou supérieur)
- PostgreSQL
- pnpm (recommandé) ou npm

## Installation

1. Cloner le projet :
```bash
git clone [URL_DU_REPO]
cd [NOM_DU_REPO]
```

2. Installer les dépendances du backend :
```bash
cd back
pnpm install
```

3. Installer les dépendances du frontend :
```bash
cd ../front
pnpm install
```

4. Configurer les variables d'environnement :

Dans le dossier `back`, créer un fichier `.env` :
```env
DATABASE_URL="postgresql://user:password@localhost:5432/chat_db"
JWT_SECRET="votre_secret_jwt"
PORT=3001
```

Dans le dossier `front`, créer un fichier `.env.local` :
```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

5. Initialiser la base de données :
```bash
cd back
pnpm prisma migrate dev
```

## Lancement du projet

1. Démarrer le backend :
```bash
cd back
pnpm start:dev
```

2. Démarrer le frontend :
```bash
cd front
pnpm dev
```

Le backend sera accessible sur `http://localhost:3001`
Le frontend sera accessible sur `http://localhost:3000`

## Fixtures

Pour ajouter des utilisateurs de test, vous pouvez utiliser les commandes suivantes dans la console Prisma :

```bash
cd back
pnpm prisma studio
```

Puis ajouter manuellement des utilisateurs avec les champs suivants :
- username (unique)
- password (sera hashé automatiquement)
- theme (parmi : purple, blue, green, red, orange, pink, indigo, teal)

Exemple d'utilisateurs de test :
```json
{
  "username": "alice",
  "password": "password123",
  "theme": "purple"
}
{
  "username": "bob",
  "password": "password123",
  "theme": "blue"
}
{
  "username": "charlie",
  "password": "password123",
  "theme": "green"
}
```

## Structure du projet

```
.
├── back/                 # Backend NestJS
│   ├── src/
│   │   ├── auth/        # Authentification
│   │   ├── users/       # Gestion des utilisateurs
│   │   ├── events/      # WebSocket events
│   │   └── prisma/      # Configuration Prisma
│   └── prisma/
│       └── schema.prisma # Schéma de la base de données
│
└── front/               # Frontend Next.js
    ├── app/            # Pages et composants
    ├── components/     # Composants réutilisables
    ├── context/       # Contextes React
    └── store/         # Store Zustand
```

## Technologies utilisées

### Backend
- NestJS
- Prisma
- PostgreSQL
- Socket.IO
- JWT pour l'authentification

### Frontend
- Next.js 14
- React
- Socket.IO Client
- Zustand pour la gestion d'état
- Tailwind CSS pour le style
- Shadcn/ui pour les composants

## Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request