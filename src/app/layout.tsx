import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Providers } from '@/store/provider';
import Modals from '@/containers/modal/Modals';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TodosNext',
  description: 'Simple and convenient app to manage your todos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className} suppressHydrationWarning={true}>
        <div id='modal-portal'></div>
        <Providers>
          {children}
          <Toaster position='bottom-right' reverseOrder={false} />
          <Modals />
        </Providers>
      </body>
    </html>
  );
}
