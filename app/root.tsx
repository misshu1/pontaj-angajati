import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import type { MetaFunction, LinksFunction } from '@remix-run/node';
import { json } from '@remix-run/node'; // Depends on the runtime you choose

import GlobalStyles from '~/styles/global.styles.css';
import tailwindStyles from '~/styles/tailwind.css';
import { getPublicKeys } from './environment.server';
import { PublicEnv } from '~/ui';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export let links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tailwindStyles },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
    },
    {
      rel: 'stylesheet',
      href: GlobalStyles,
    },
  ];
};

export function loader() {
  return json({
    publicKeys: getPublicKeys(),
  });
}

export default function App() {
  const { publicKeys } = useLoaderData<typeof loader>();

  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <PublicEnv {...publicKeys} />
        <LiveReload />
      </body>
    </html>
  );
}
