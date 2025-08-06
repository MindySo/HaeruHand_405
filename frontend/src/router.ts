import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import Kyumin from './pages/Kyumin';
import Chaeeun from './pages/Chaeeun';
import App from './App';
import WeatherAlertPage from './pages/WeatherAlertPage/WeatherAlertPage';
import PhotoAnalysisResultPage from './pages/PhotoAnalysisResultPage/PhotoAnalysisResultPage';
import TrackingSharePage from './pages/TrackingSharePage/TrackingSharePage';
import LocationSelectPage from './pages/LocationSelectPage/LocationSelectPage';

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
  path: '/chaeeun',
  component: Chaeeun,
});

const weatherAlertRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/weather-alert',
  component: WeatherAlertPage,
});

const photoAnalysisResultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/photo-analysis',
  component: PhotoAnalysisResultPage,
});

const trackingShareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tracking-share',
  component: TrackingSharePage,
});

const locationSelectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/location-select',
  component: LocationSelectPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  kyuminRoute,
  chaeunRoute,
  weatherAlertRoute,
  photoAnalysisResultRoute,
  trackingShareRoute,
  locationSelectRoute,
]);
export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
