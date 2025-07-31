import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import Kyumin from './pages/Kyumin';
import Chaeun from './pages/Chaeun';
import App from './App';

const rootRoute = createRootRoute();

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
});

const kyuminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/kyumin',
  component: Kyumin,
});

const chaeunRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chaeun',
  component: Chaeun,
});

const routeTree = rootRoute.addChildren([homeRoute, kyuminRoute, chaeunRoute]);
export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
