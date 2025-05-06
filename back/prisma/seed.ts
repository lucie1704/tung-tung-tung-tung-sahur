import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Supprimer les données existantes
  await prisma.user.deleteMany();

  // Créer les utilisateurs avec des thèmes différents
  const users = [
    {
      username: 'croco',
      password: await bcrypt.hash('toutou', 10),
      theme: 'purple',
    },
    {
      username: 'papoti',
      password: await bcrypt.hash('galla', 10),
      theme: 'blue',
    },
    {
      username: 'tennyo',
      password: await bcrypt.hash('capii', 10),
      theme: 'green',
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
