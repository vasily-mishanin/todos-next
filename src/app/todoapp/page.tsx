'use client';

import { Logo } from '@/components/Logo/Logo';

export default function Home() {
  return (
    <section className='flex min-h-full flex-col items-center justify-between p-8'>
      <div className="relative w-full flex flex-col gap-8 justify-center items-center before:absolute before:h-[180px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[250px] after:w-[200px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-green-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-300 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <h1 className='text-4xl leading-loose text-gray-700 max-[600px]:text-xl'>
          This App will help you to effectively manage your todos
        </h1>
        <Logo />
      </div>
    </section>
  );
}
