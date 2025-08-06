import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import Kyumin from './pages/Kyumin';
import Chaeeun from './pages/Chaeeun';
import App from './App';
import { MainPage } from './pages/MainPage/MainPage';

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

const chaeeunRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chaeeun',
  component: Chaeeun,
});

const mainPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/main',
  component: MainPage,
});

const routeTree = rootRoute.addChildren([homeRoute, kyuminRoute, chaeeunRoute, mainPageRoute]);
export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
