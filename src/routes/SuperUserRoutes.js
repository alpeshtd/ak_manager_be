// project imports
import MainLayout from 'layout/MainLayout';
import PageViewTable from 'views/elements/PageViewTable';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const SuperUserRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
        path: 'elements',
        children: [
          {
            path: 'userRole',
            element: <PageViewTable slug='elements/userRole' />
          }
        ]
      },
      {
        path: 'elements',
        children: [
          {
            path: 'users',
            element: <PageViewTable slug='elements/user' />
          }
        ]
      },
  ]
};

export default SuperUserRoutes;
