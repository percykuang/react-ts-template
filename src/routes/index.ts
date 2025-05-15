import dashboard from './dashboard';
import home from './home';
import type { RouteConfig, RouterConfigProps } from './types';
import { renderRoutes } from './utils';

const allRoutes: RouteConfig[] = [home, dashboard];

export const RouterConfig: React.FC<RouterConfigProps> = ({ routes = allRoutes }) =>
  renderRoutes(routes);

export * from './types';
