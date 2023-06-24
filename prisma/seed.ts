import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const profilePictures = [
  'https://res.cloudinary.com/dttmkct48/image/upload/v1687397094/s0diodr61n2toemipuqi.png',
  'https://res.cloudinary.com/dttmkct48/image/upload/v1687106119/jny5tkvuswtinh0nb7ti.png',
  'https://res.cloudinary.com/dttmkct48/image/upload/v1687425856/wmhhojx6pmxkcdqb4k0r.jpg',
  'https://res.cloudinary.com/dttmkct48/image/upload/v1687412284/o6lt7aibklk6hjhihusw.jpg',
];

async function main() {
  /* ----------------------------Clean up database-------------------------- */
  const deleteAll = await prisma.user.deleteMany();

  if (!deleteAll) {
    console.log(`Something went wrong ~ deleteAll`);
    return;
  }

  console.log({ deleteAll });

  /* ----------------------------Create own account-------------------------- */
  const myAccount = await prisma.user.create({
    data: {
      firstName: 'Francis',
      lastName: 'Ong',
      email: `francis@gmail.com`,
      birthday: new Date('2000-05-13').toISOString(),
      bio: 'Full snack developer',
      hashedPassword: await bcrypt.hash('Stratpoint123!', 12),
      profilePicture:
        'https://res.cloudinary.com/dttmkct48/image/upload/v1687591027/twsw2dvqf0ipdolf2rng.png',
    },
  });

  if (!myAccount) {
    console.log(`Something went wrong ~ myAccount`);
    return;
  }

  console.log('My account created');

  /* ----------------------------Create random users-------------------------- */
  const userCount = 3;

  for (let i = 1; i <= userCount; i++) {
    const firstName = faker.person.firstName();

    const user = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: faker.person.lastName(),
        email: `${firstName}@gmail.com`,
        hashedPassword: await bcrypt.hash('Stratpoint123!', 12),
        bio: faker.person.bio(),
        birthday: new Date('2000-05-13').toISOString(),
        profilePicture: profilePictures[i - 1],
      },
    });

    if (!user) {
      console.log(`Something went wrong while creating user ${firstName}`);
      return;
    }

    console.log(`Created user ${firstName}`);

    /* ----------------------------Create post for each users-------------------------- */
    const post = await prisma.post.create({
      data: {
        userId: user.id,
        post: faker.lorem.paragraph(),
      },
    });

    if (!post) {
      console.log(
        `Something went wrong while creating post for user ${firstName}`,
      );
      return;
    }

    console.log(`Created post ${post.id} for user ${firstName}`);

    /* ----------------------------Like the newly created post----------------------- */
    const like = await prisma.like.create({
      data: {
        postId: post.id,
        userId: user.id,
      },
    });

    if (!like) {
      console.log(
        `Something went wrong while creating like for post ${post.id}`,
      );
      return;
    }

    console.log(`Created like ${like.id} for post ${post.id}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
