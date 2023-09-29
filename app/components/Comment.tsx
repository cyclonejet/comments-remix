import type { Comment } from '../root';

export default function Comment({ comment }: { comment: Comment }) {
  return (
    <div className='flex lg:p-3 p-2 border-black border-2 rounded'>
      <div className='mr-5'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-user lg:h-20 lg:w-20 h-14 w-14'
          width='100%'
          height='100%'
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='currentColor'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
          <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0'></path>
          <path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2'></path>
        </svg>
      </div>

      <div>
        <p className='text-2xl'>{comment.username}</p>
        <span className='text-xs'>{comment.time}</span>
        <p className='text-base whitespace-pre-line'>{comment.content}</p>
      </div>
    </div>
  );
}
