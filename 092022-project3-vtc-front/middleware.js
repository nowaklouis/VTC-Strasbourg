import { NextResponse } from 'next/server';

export default function middleware(req) {
  const url = req.url;
  const user = 'admin';

  if (user !== 'admin') {
    if (url.includes('/dashboard')) {
      return NextResponse.redirect('http://localhost:3000/login');
    }
  }

  if (user === 'admin') {
    if (url.includes('/dashboard')) {
      return NextResponse.next();
    }
  }
}
