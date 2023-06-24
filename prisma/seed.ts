import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  /* Clean up database */
  const deleteAll = await prisma.user.deleteMany();

  if (!deleteAll) {
    console.log('Something went wrong');
    return;
  }

  console.log({ deleteAll });

  const myAccount = await prisma.user.create({
    data: {
      firstName: 'Francis',
      lastName: 'Ong',
      email: `francis@gmail.com`,
      birthday: new Date('2000-05-13').toISOString(),
      bio: faker.person.bio(),
      hashedPassword: await bcrypt.hash('Stratpoint123!', 12),
      profilePicture:
        'http://res.cloudinary.com/dttmkct48/image/upload/v1687425856/wmhhojx6pmxkcdqb4k0r.jpg',
    },
  });

  console.log({ myAccount });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
