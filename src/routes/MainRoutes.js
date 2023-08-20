import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AddNew from 'views/overview/AddNew';
import DetailsPage from 'views/common/DetailsPage';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

const PageViewTable = Loadable(lazy(() => import('views/elements/PageViewTable')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

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
          path: 'add-utilization',
          element: <AddNew />
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
          path: 'add-purchase',
          element: <AddNew />
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
    {
      path: 'overview',
      children: [
        {
          path: 'add-order',
          element: <AddNew />
        }
      ]
    },
    {
      path: 'elements',
      children: [
        {
          path: 'stock',
          element: <PageViewTable slug='elements/stock' />
        }
      ]
    },
    {
      path: 'elements',
      children: [
        {
          path: 'add-stock',
          element: <AddNew />
        }
      ]
    },
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
          path: 'add-customer',
          element: <AddNew />
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
    {
      path: 'elements',
      children: [
        {
          path: 'add-vendor',
          element: <AddNew />
        }
      ]
    },
    {
      path: 'elements',
      children: [
        {
          path: 'employees',
          element: <PageViewTable slug='elements/employee' />
        }
      ]
    },
    {
      path: 'elements',
      children: [
        {
          path: 'add-employee',
          element: <AddNew />
        }
      ]
    },
    {
      path: 'item',
      children: [
        {
          path: 'details',
          element: <DetailsPage />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
