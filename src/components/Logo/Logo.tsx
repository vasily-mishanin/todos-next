import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <div className=''>
      <Link className='flex items-center gap-2' href='/'>
        <Image
          src='/icon-done-200.svg'
          alt='logo toods'
          width='100'
          height='100'
        />
        <span className='text-xl  font-bold tracking-wide'>TodosNext</span>
      </Link>
    </div>
  );
}
