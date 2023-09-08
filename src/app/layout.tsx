import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '500', '700'],
  style: 'normal',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ordinis',
  description: 'Developed by Lucas Rodrigues Cintra',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" className={poppins.className}>
      <body>{children}</body>
    </html>
  )
}
