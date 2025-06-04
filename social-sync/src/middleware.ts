import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { locales } from './navigation';

const publicPages = [
  '/',
  '/privacy-policy',
  '/login',
  '/signup',
  // (/dashboard requires auth)
];

const intlMiddleware = createMiddleware({
  locales: ['en', 'pt-PT'],
  defaultLocale: 'en',
});

const testPathnameRegex = (pages: string[], pathName: string): boolean => {
  return RegExp(
    `^(/(${locales.join('|')}))?(${pages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  ).test(pathName);
};

const authMiddleware = auth((req) => {
  const session = req.auth;

  // Redirecionar para a página de login se não for autenticado
  if (!session) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return intlMiddleware(req);
});

const middleware = (req: NextRequest) => {
  const isPublicPage = testPathnameRegex(publicPages, req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
};

export const config = {
  matcher: [
    '/',
    // Definir um cookie para lembrar a linguagem anterior para
    // todas as solicitações que possuem um prefixo de tradução
    '/(pt-PT|en)/:path*',

    // Habilitar redirecionamentos que adicionam traduções ausentes
    // (ex: `/pathnames` -> `/en/pathnames`)
    '/((?!api|_next|.*\\..*).*)',
  ],
};

export default middleware;
