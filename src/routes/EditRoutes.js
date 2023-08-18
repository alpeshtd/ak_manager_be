// project imports
import MainLayout from 'layout/MainLayout';
import AddNew from 'views/overview/AddNew';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const EditRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'overview',
      children: [
        {
          path: 'edit-new-data',
          element: <AddNew />
        }
      ]
    },
    {
      path: 'elements',
      children: [
        {
          path: 'edit-new-data',
          element: <AddNew />
        }
      ]
    }
  ]
};

export default EditRoutes;
