import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import DetailsPage from 'views/common/DetailsPage';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

const PageViewTable = Loadable(lazy(() => import('views/elements/PageViewTable')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'overview',
      children: [
        {
          path: 'orders',
          element: <PageViewTable slug='overview/order' />
        }
      ]
    },
    {
      path: 'overview',
      children: [
        {
          path: 'utilizations',
          element: <PageViewTable slug='overview/utilization' />
        }
      ]
    },
    {
      path: 'overview',
      children: [
        {
          path: 'purchases',
          element: <PageViewTable slug='overview/purchase' />
        }
      ]
    },
    {
      path: 'overview',
      children: [
        {
          path: 'incomes',
          element: <PageViewTable slug='overview/income' />
        }
      ]
    },
    {
      path: 'overview',
      children: [
        {
          path: 'expenses',
          element: <PageViewTable slug='overview/expense' />
        }
      ]
    },
    // {
    //   path: 'elements',
    //   children: [
    //     {
    //       path: 'stock',
    //       element: <PageViewTable slug='elements/stock' />
    //     }
    //   ]
    // },
    {
      path: 'elements',
      children: [
        {
          path: 'customers',
          element: <PageViewTable slug='elements/customer' />
        }
      ]
    },
    {
      path: 'elements',
      children: [
        {
          path: 'vendors',
          element: <PageViewTable slug='elements/vendor' />
        }
      ]
    },
    // {
    //   path: 'elements',
    //   children: [
    //     {
    //       path: 'employees',
    //       element: <PageViewTable slug='elements/employee' />
    //     }
    //   ]
    // },
    {
      path: 'item',
      children: [
        {
          path: 'details',
          element: <DetailsPage />
        }
      ]
    }
  ]
};

export default MainRoutes;
