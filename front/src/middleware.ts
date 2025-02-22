'use server'
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';


export async function middleware(req: NextRequest) {
  const refresh = req.cookies.get('refresh_token')
  if (!refresh) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const access = req.cookies.get('access_token')
  if (!access) {
    // get new refresh token and affix
    const response = await fetch(`${process.env.BACK_ENDPOINT}/auth/refresh`, {
      cache: 'no-store', credentials: 'include', headers: headers()
    })
    if (response.ok) {
      const cookie = response.headers.get('set-cookie')?.split('; ')
      const attribs = new Map()
      cookie?.forEach(value => {
        const pair = value.split('=')
        if (pair.length == 1) {
          attribs.set(pair[0], true)
        } else {
          attribs.set(pair[0], pair[1])
        }
      })
      const newUrl = new URL('/redirect', req.url)
      newUrl.searchParams.set('to', req.nextUrl.pathname.slice(1))
      const res = NextResponse.redirect(newUrl)

      res.cookies.set('access_token', attribs.get('access_token'), {
        expires: new Date(attribs.get('expires')),
        httpOnly: attribs.has('HttpOnly'),
        sameSite: attribs.get('SameSite'),
        domain: attribs.get('Domain'),
        path: attribs.get('Path'),
      })

      return res
    } else {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/success', '/home', '/trabalhos', '/view/:id*'],
};
