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
        <ThemeProvider attribute='class' defaultTheme='dark' forcedTheme='dark' enableSystem disableTransitionOnChange>
          <div className='container mx-auto pt-5 h-screen'>
            <SpaMenuBar />
            <div className='p-5 md:p-10' />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
