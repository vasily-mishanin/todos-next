'use client';

import { Logo } from '@/components/Logo/Logo';
import { Header } from '@/containers/Header/Header';
import { useEffect } from 'react';

export default function Home() {
  console.log('Home');

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className="relative flex flex-col gap-8 justify-center items-center before:absolute before:h-[180px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[250px] after:w-[480px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-green-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-300 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <h1 className='text-4xl leading-loose'>
          This App will help you to effectively manage your todos
        </h1>
        <Logo />
      </div>
    </main>
  );
}
