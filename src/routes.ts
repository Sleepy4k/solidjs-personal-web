import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('@pages/home')),
  },
  {
    path: '/resume',
    component: lazy(() => import('@pages/resume')),
  },
  {
    path: '/portofolio',
    component: lazy(() => import('@pages/portofolio')),
  },
  {
    path: '/contact',
    component: lazy(() => import('@pages/contact')),
  },
  {
    path: '**',
    component: lazy(() => import('@pages/404')),
  },
];
