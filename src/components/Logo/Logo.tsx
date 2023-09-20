import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link className='flex items-center gap-2' href='/'>
      <Image
        src='/icon-done-200.svg'
        alt='todos logo'
        width='75'
        height='75'
        priority={true}
      />
      <span className='text-xl  font-bold tracking-wide text-gray-700'>
        TodosNext
      </span>
    </Link>
  );
}
