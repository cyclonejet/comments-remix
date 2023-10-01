import { useEffect, useRef } from 'react';
import {
  json,
  type ActionFunctionArgs,
  type LinksFunction,
} from '@remix-run/node';
import {
  Form,
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';

import Comment from './components/Comment';

import { createComment, getComments } from './utils/comment.server';

import styles from './tailwind.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

// const comments = [
//   {
//     username: 'grumpy',
//     content: `I lean towards Remix. I've been a big fan of the React router (Remix) authors for a long time.

//       I like Next, but don't like how Vercel tries to lock you into their ecosystem, IMO.

//       The newer features of Next are pretty much straight out of Remix. That's not a bad thing necessarily, but I think it's telling that Remix has features worth stealing despite Next being around much longer.
//       `,
//     time: '2023-06-23 18:36:33',
//   },
//   {
//     username: 'denden',
//     content: `I like the structure of Remix. But how small its community is is concerning. I'm afraid I'll hit some roadblock and won't be able to get help.`,
//     time: '2023-06-23 18:59:01',
//   },
// ];

// export type Comment = (typeof comments)[0];

export interface Comment {
  id: number;
  username: string;
  content: string;
  createdAt: string;
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const commentForm = Object.fromEntries(formData);
  const comment = await createComment(commentForm);
  return json({ comment });
};

export const loader = async () => {
  const comments = await getComments();
  return json({ comments });
};

export default function App() {
  const navigation = useNavigation();

  const formRef = useRef<HTMLFormElement>(null);

  const { comments } = useLoaderData<typeof loader>();

  const isAdding = navigation.state === 'submitting';

  useEffect(() => {
    if (!isAdding) {
      formRef.current?.reset();
    }
  }, [isAdding]);

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='p-10 font-serif'>
        <h3 className='lg:text-5xl text-3xl lg:mb-10 mb-4'>Comments</h3>
        <div className='flex flex-col gap-5'>
          {comments.length === 0
            ? 'No comments.'
            : comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
        </div>

        <div className='py-8 px-4 mt-12 bg-gray-100'>
          <h4 className='lg:text-3xl text-xl mb-10'>Write a comment</h4>
          <Form method='post' ref={formRef} className='flex flex-col gap-8'>
            <input
              name='username'
              aria-label='Username'
              type='text'
              placeholder='Username'
              className='leading-loose p-1'
            />
            <textarea
              name='content'
              aria-label='Comment'
              placeholder='Comment'
              className='p-1'
            />
            <button className='bg-gray-400 w-24 h-12 rounded' type='submit'>
              {navigation.state === 'submitting' ? 'Posting' : 'Post'}
            </button>
          </Form>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
