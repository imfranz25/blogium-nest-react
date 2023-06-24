import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  /* Clean up database */
  const deleteAll = await prisma.user.deleteMany();

  if (!deleteAll) {
    return;
  }

  console.log({ deleteAll });

  const firstName = faker.person.firstName();
  const hashedPassword = await bcrypt.hash('Stratpoint123!', 12);
  const accountOne = await prisma.user.create({
    data: {
      firstName,
      hashedPassword,
      lastName: faker.person.lastName(),
      email: `${firstName}@gmail.com`,
      birthday: new Date().toISOString(),
      bio: faker.person.bio(),
      profilePicture:
        'http://res.cloudinary.com/dttmkct48/image/upload/v1687425856/wmhhojx6pmxkcdqb4k0r.jpg',
    },
  });

  console.log({ accountOne });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
