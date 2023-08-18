// project imports
import MainLayout from 'layout/MainLayout';
import AddNew from 'views/overview/AddNew';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AddNewRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'overview',
      children: [
        {
          path: 'add-new-data',
          element: <AddNew />
        }
      ]
    },
    {
      path: 'elements',
      children: [
        {
          path: 'add-new-data',
          element: <AddNew />
        }
      ]
    }
  ]
};

export default AddNewRoutes;
