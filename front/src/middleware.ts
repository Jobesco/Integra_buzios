'use server'
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

const corsOptions: {
  allowedMethods: string[];
  allowedOrigins: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  maxAge?: number;
  credentials: boolean;
} = {
  allowedMethods: (process.env?.ALLOWED_METHODS || "").split(","),
  allowedOrigins: (process.env?.ALLOWED_ORIGIN || "").split(","),
  allowedHeaders: (process.env?.ALLOWED_HEADERS || "").split(","),
  exposedHeaders: (process.env?.EXPOSED_HEADERS || "").split(","),
  maxAge: process.env?.MAX_AGE && parseInt(process.env?.MAX_AGE) || undefined, // 60 * 60 * 24 * 30, // 30 days
  credentials: process.env?.CREDENTIALS == "true",
};

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();
  // TODO jogar pro login se não tiver cookie!!
  const cook = req.cookies.get('JSESSIONID')
  if (!cook) return NextResponse.redirect(new URL('/home', req.url))


  // ? bypass enquanto nao exige CORS do lado do cliente
  // const origin = req.headers.get("origin") ?? "";
  // if (req.method === "OPTIONS") {
  //   // Responder pré-verificação (preflight) do navegador
  //   const optionsResponse = new NextResponse(null, { status: 204 });

  //   if (corsOptions.allowedOrigins.includes(origin) || corsOptions.allowedOrigins.includes("*")) {
  //     optionsResponse.headers.set("Access-Control-Allow-Origin", origin);
  //   }

  //   optionsResponse.headers.set("Access-Control-Allow-Credentials", corsOptions.credentials.toString());
  //   optionsResponse.headers.set("Access-Control-Allow-Methods", corsOptions.allowedMethods.join(","));
  //   optionsResponse.headers.set("Access-Control-Allow-Headers", corsOptions.allowedHeaders.join(","));
  //   optionsResponse.headers.set("Access-Control-Expose-Headers", corsOptions.exposedHeaders.join(","));
  //   optionsResponse.headers.set("Access-Control-Max-Age", corsOptions.maxAge?.toString() ?? "");

  //   return optionsResponse;
  // }

  // // Configurar CORS para requisições normais
  // if (corsOptions.allowedOrigins.includes(origin) || corsOptions.allowedOrigins.includes("*")) {
  //   response.headers.set("Access-Control-Allow-Origin", origin);
  // }

  // response.headers.set("Access-Control-Allow-Credentials", corsOptions.credentials.toString());
  // response.headers.set("Access-Control-Allow-Methods", corsOptions.allowedMethods.join(","));
  // response.headers.set("Access-Control-Allow-Headers", corsOptions.allowedHeaders.join(","));
  // response.headers.set("Access-Control-Expose-Headers", corsOptions.exposedHeaders.join(","));
  // response.headers.set("Access-Control-Max-Age", corsOptions.maxAge?.toString() ?? "");

  return response;
}


// export const config = {
//   matcher: ['/',
//     // '/success', '/home', '/trabalhos', '/view/:id*'
//   ],
// };
