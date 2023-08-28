import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
// import openSocket from 'socket.io-client';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { useEffect } from 'react';
import ADD_USER_ROLE_DATA from 'defaults/addUserRole';
import ADD_USER_DATA from 'defaults/addUser';
// import ADD_EMPLOYEE_DATA from 'defaults/addEmployees';
import ADD_VENDOR_DATA from 'defaults/addVendor';
import ADD_CUSTOMER_DATA from 'defaults/addCustomers';
// import ADD_STOCK_DATA from 'defaults/addStock';
import ADD_ORDER_DATA from 'defaults/addOrderFields';
import ADD_UTILIZATION_DATA from 'defaults/addUtilization';
import ADD_PURCHASE_DATA from 'defaults/addPurchases';
import ADD_INCOME_DATA from 'defaults/addIncomes';
import { useNavigate } from 'react-router';
import ADD_EXPENSE_DATA from 'defaults/addExpenses';
// import startSocket from './api/socket';

// ==============================|| APP ||============================== //

const App = () => {
  const storeState = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: 'USER_FETCH_REQUESTED',
      payload: {}
    });
  }, []);

  useEffect(() => {
    if (!storeState.app.user) {
      return;
    }

    if (storeState.app.user.error) {
      navigate('/login');
      return;
    }

    // const socket = openSocket('https://comanager.onrender.com');
    // const socket = openSocket('http://localhost:4000');
    // socket.on('refresh', (data) => {
    //   if (data.action === 'notification') {
    //     dispatch({
    //       type: 'NOTIFICATIONS_FETCH_REQUESTED',
    //       payload: {}
    //     });
    //   }
    // });
    dispatch({
      type: ADD_USER_ROLE_DATA.getDispatchType,
      payload: {
        query: ADD_USER_ROLE_DATA.getQuery,
        variables: {}
      }
    });
    dispatch({
      type: ADD_USER_DATA.getDispatchType,
      payload: {
        query: ADD_USER_DATA.getQuery,
        variables: {}
      }
    });
    // dispatch({
      //   type: ADD_EMPLOYEE_DATA.getDispatchType,
      //   payload: {
        //     query: ADD_EMPLOYEE_DATA.getQuery,
        //     variables: {}
      //   }
    // });
    dispatch({
      type: ADD_VENDOR_DATA.getDispatchType,
      payload: {
        query: ADD_VENDOR_DATA.getQuery,
        variables: {}
      }
    });
    dispatch({
      type: ADD_CUSTOMER_DATA.getDispatchType,
      payload: {
        query: ADD_CUSTOMER_DATA.getQuery,
        variables: {}
      }
    });
    // dispatch({
      //   type: ADD_STOCK_DATA.getDispatchType,
      //   payload: {
        //     query: ADD_STOCK_DATA.getQuery,
        //     variables: {}
      //   }
    // });
    dispatch({
      type: ADD_ORDER_DATA.getDispatchType,
      payload: {
        query: ADD_ORDER_DATA.getQuery,
        variables: {}
      }
    });
    dispatch({
      type: ADD_UTILIZATION_DATA.getDispatchType,
      payload: {
        query: ADD_UTILIZATION_DATA.getQuery,
        variables: {}
      }
    });
    dispatch({
      type: ADD_PURCHASE_DATA.getDispatchType,
      payload: {
        query: ADD_PURCHASE_DATA.getQuery,
        variables: {}
      }
    });
    dispatch({
      type: ADD_EXPENSE_DATA.getDispatchType,
      payload: {
        query: ADD_EXPENSE_DATA.getQuery,
        variables: {}
      }
    });
    dispatch({
      type: ADD_INCOME_DATA.getDispatchType,
      payload: {
        query: ADD_INCOME_DATA.getQuery,
        variables: {}
      }
    });
  }, [storeState.app.user]);

  useEffect(() => {
    if (!storeState.elements.userRoles || storeState.elements.userRoles.error) {
      return;
    }
    const temp = storeState.elements.userRoles.find((ur) => ur.id == storeState.app.user.role);
    if (temp) {
      dispatch({ type: 'SET_LOGGED_USERROLE', payload: temp });
    }
  }, [storeState.elements.userRoles]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(storeState.customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes authenticated={!!storeState.app.user} />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
