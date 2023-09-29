import { json } from '@remix-run/node';
import { prisma } from './prisma.server';

import type { CommentForm } from './types.server';

export const createComment = async (comment: CommentForm) => {
  const { username, content } = comment;

  if (typeof username !== undefined && typeof content !== undefined) {
    const newComment = await prisma.comment.create({
      data: {
        username: username!,
        content: content!,
      },
    });

    if (!newComment) {
      return json(
        {
          error: `Something went wrong trying to create a new comment.`,
          fields: { username: comment.username, content: comment.content },
        },
        { status: 400 },
      );
    }

    return {
      id: newComment.id,
      username: comment.username,
      content: comment.content,
      createdAt: newComment.createdAt,
    };
  }

  return json(
    {
      error: `One of the field is empty.`,
      fields: { username: comment.username, content: comment.content },
    },
    { status: 400 },
  );
};

export const getComments = () => {
  return prisma.comment.findMany();
};
