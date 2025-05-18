'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '@/component/Menu';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Menu />
        {children}
      </body>
    </html>
  );
}
