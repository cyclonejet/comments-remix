import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import Comment from './components/Comment';

import styles from './tailwind.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

const comments = [
  {
    username: 'grumpy',
    content: `I lean towards Remix. I've been a big fan of the React router (Remix) authors for a long time.

      I like Next, but don't like how Vercel tries to lock you into their ecosystem, IMO.
      
      The newer features of Next are pretty much straight out of Remix. That's not a bad thing necessarily, but I think it's telling that Remix has features worth stealing despite Next being around much longer.
      `,
    time: '2023-06-23 18:36:33',
  },
  {
    username: 'denden',
    content: `I like the structure of Remix. But how small its community is is concerning. I'm afraid I'll hit some roadblock and won't be able to get help.`,
    time: '2023-06-23 18:59:01',
  },
];

export type Comment = (typeof comments)[0];

export default function App() {
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
          {comments.map((comment) => (
            <Comment key={comment.username} comment={comment} />
          ))}
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
