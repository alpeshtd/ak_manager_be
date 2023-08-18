import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import AddNewRoutes from './AddNewRoutes';
import EditRoutes from './EditRoutes';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import SuperUserRoutes from './SuperUserRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes({ authenticated }) {
  const appStore = useSelector(store => store.app);
  const [allowedActions, setAllowedActions] = useState([]);
  useEffect(() => {
    if (!appStore.loggedUserRole) {
      return;
    }
    const tempAccess = appStore.loggedUserRole.access.map((acc) => acc.value);
    setAllowedActions(tempAccess);
  }, [appStore.loggedUserRole]);

  const routes = [AuthenticationRoutes];
  if (authenticated) {
    if(allowedActions.includes('add') || allowedActions.includes('superUser')) {
      routes.unshift(AddNewRoutes);
    }
    if(allowedActions.includes('edit') || allowedActions.includes('superUser')) {
      routes.unshift(EditRoutes);
    }
    if(allowedActions.includes('superUser')) {
      routes.unshift(SuperUserRoutes)
    }
    routes.unshift(MainRoutes);
  }
  return useRoutes(routes);
}
