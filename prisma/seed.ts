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

const databaseCleanUp = async () => {
  const deleteAll = await prisma.user.deleteMany();

  if (!deleteAll) {
    console.log(`Something went wrong ~ deleteAll`);
    return;
  }

  console.log({ deleteAll });
};

const createOwnAccount = async () => {
  const myAccount = await prisma.user.create({
    data: {
      firstName: 'Francis',
      lastName: 'Ong',
      email: `francis@gmail.com`,
      birthday: new Date('2000-05-13').toISOString(),
      bio: 'Full snack developer',
      hashedPassword: await bcrypt.hash('Fr@ncis123!', 12),
      profilePicture:
        'https://res.cloudinary.com/dttmkct48/image/upload/v1687591027/twsw2dvqf0ipdolf2rng.png',
    },
  });

  if (!myAccount) {
    console.log(`Something went wrong ~ myAccount`);
    return;
  }
  console.log('My account ~ created');

  return myAccount.id;
};

const createPost = async (userId: string) => {
  const post = await prisma.post.create({
    data: {
      userId: userId,
      post: faker.lorem.paragraph(),
    },
  });

  if (!post) {
    console.log(`Something went wrong while creating post for user ${userId}`);
  }

  console.log(`Created post ${post.id} for user ${userId}`);

  return post.id;
};

const likePost = async (userId: string, postId: string) => {
  const like = await prisma.like.create({
    data: {
      postId: postId,
      userId: userId,
    },
  });

  if (!like) {
    console.log(`Something went wrong while creating like for post ${postId}`);
  }

  console.log(`Created like ${like.id} for post ${postId}`);
};

const addComment = async (userId: string, postId: string) => {
  const comment = await prisma.comment.create({
    data: {
      postId: postId,
      userId: userId,
      comment: faker.lorem.paragraph(),
    },
  });

  if (!comment) {
    console.log(
      `Something went wrong while adding a comment for post ${postId}`,
    );
  }

  console.log(`Added comment ${comment.id} for post ${postId}`);
};

const createRandomUsers = async (userCount = 3, ownId) => {
  for (let i = 1; i <= userCount; i++) {
    const firstName = faker.person.firstName();

    const user = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: faker.person.lastName(),
        email: `${firstName.toLowerCase()}@gmail.com`,
        hashedPassword: await bcrypt.hash('Fr@ncis123!', 12),
        bio: faker.person.bio(),
        birthday: new Date('2000-05-13').toISOString(),
        profilePicture: profilePictures[i - 1],
      },
    });

    if (!user) {
      console.log(`Something went wrong while creating user ${firstName}`);
      break;
    }

    console.log(`Created user ${firstName}`);

    /* ----------------------------Create post for each users-------------------------- */
    const newPostId = await createPost(user.id);

    /* ----------------------------Like the newly created post----------------------- */
    await likePost(user.id, newPostId);
    await likePost(ownId, newPostId);

    /* ----------------------------Add comment to post----------------------- */
    await addComment(user.id, newPostId);
    await addComment(ownId, newPostId);
  }

  console.log('Random users created :)');
};

async function main() {
  /* ----------------------------Clean up database-------------------------- */
  await databaseCleanUp();

  /* ----------------------------Create own account-------------------------- */
  const ownId = await createOwnAccount();

  /* ----------------------------Create random users-------------------------- */
  await createRandomUsers(4, ownId);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
