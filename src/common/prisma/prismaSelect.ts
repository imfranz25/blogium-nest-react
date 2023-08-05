import { Prisma } from '@prisma/client';

export const userSelection: Prisma.UserSelect = {
  id: true,
  profilePicture: true,
  firstName: true,
  lastName: true,
  birthday: true,
  bio: true,
  email: true,
  Post: {
    orderBy: { createdAt: 'desc' },
    include: {
      User: {
        select: {
          profilePicture: true,
          firstName: true,
          lastName: true,
        },
      },
      Like: true,
      Comment: {
        select: {
          id: true,
          comment: true,
          createdAt: true,
          User: {
            select: {
              profilePicture: true,
              firstName: true,
              lastName: true,
              id: true,
            },
          },
        },
      },
    },
  },
};

export const commentSelection: Prisma.CommentSelect = {
  id: true,
  comment: true,
  userId: true,
  createdAt: true,
  User: {
    select: {
      profilePicture: true,
      firstName: true,
      lastName: true,
      id: true,
    },
  },
};

export const postInclude: Prisma.PostInclude = {
  User: {
    select: {
      profilePicture: true,
      firstName: true,
      lastName: true,
    },
  },
  Like: true,
  Comment: {
    select: {
      id: true,
      comment: true,
      createdAt: true,
      User: {
        select: {
          profilePicture: true,
          firstName: true,
          lastName: true,
          id: true,
        },
      },
    },
  },
};
