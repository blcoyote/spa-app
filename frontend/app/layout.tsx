import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../style/globals.css';
import SpaMenuBar from '@/components/SpaMenuBar';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spa',
  description: 'Hvordan er det i spaen?',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          forcedTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='container md:mx-auto pb-5 h-screen bg-background'>
            <SpaMenuBar />
            <div className='p-3 md:p-10' />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
