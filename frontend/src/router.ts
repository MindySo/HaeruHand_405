import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import App from './App';
import WeatherAlertPage from './pages/WeatherAlertPage/WeatherAlertPage';
import PhotoAnalysisResultPage from './pages/PhotoAnalysisResultPage/PhotoAnalysisResultPage';
import TrackingSharePage from './pages/TrackingSharePage/TrackingSharePage';
import LocationSelectPage from './pages/LocationSelectPage/LocationSelectPage';
import BuddyTrackingPage from './pages/BuddyTrackingPage/BuddyTrackingPage';
import { MainPage } from './pages/MainPage/MainPage';
import { LoginPage } from './pages/LoginPage/LoginPage';

const rootRoute = createRootRoute();

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
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

const buddyTrackingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/buddy-tracking',
  component: BuddyTrackingPage,
});

const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/main',
  component: MainPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  weatherAlertRoute,
  photoAnalysisResultRoute,
  trackingShareRoute,
  locationSelectRoute,
  buddyTrackingRoute,
  mainRoute,
  loginRoute,
]);
export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
