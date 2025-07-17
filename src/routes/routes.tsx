import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { Suspense } from 'react';
import { DashboardLayout } from 'src/layouts/dashboard';
import { LoadingScreen } from 'src/components/loading-screen';
import { usePathname } from './hooks';
import { getRoutes } from 'src/pages/route';
import Page404 from 'src/pages/error/404';
import { Authenticated } from '@refinedev/core';
import { authRoute } from 'src/pages/auth/routes';

function SuspenseOutlet() {
  const pathname = usePathname();
  return (
    <Suspense key={pathname} fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}

const dashboardLayout = () => (
  <Authenticated
    key="authenticated-inner"
  >
    <DashboardLayout>
      <SuspenseOutlet />
    </DashboardLayout>
  </Authenticated>
);


const GuestLayout = () => (
  <SuspenseOutlet />
);

export const applicationMainRoutes: RouteObject[] = [
  {
    path: '/',
    element: dashboardLayout(),
    children: [
      ...getRoutes(),
      {
        path: '*',
        element: <Page404 />
      }
    ]
  },
  {
    path: '/guest',
    element: <GuestLayout />,
    children: [
      ...authRoute,
      {
        path: '*',
        element: <Page404 />
      }
    ]
  },

];
