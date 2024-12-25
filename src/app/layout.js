import './globals.css';

export const metadata = {
  title: 'CZS SUPER CUP',
  description: 'SUPER CUP',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
