import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'ui-component/Loader';
import CustomTable from 'ui-component/CustomTable';
import ADD_CUSTOMER_DATA from 'defaults/addCustomers';

// ==============================|| TYPOGRAPHY ||============================== //

const Customers = () => {
  const dispatch = useDispatch();
  const elementsStore = useSelector((state) => state.elements);
  useEffect(() => {
    dispatch({
      type: 'CUSTOMERS_FETCH_REQUESTED',
      payload: {
        // operationName: 'userRoles',
        query: `query {
          customers {
            id
            name
            mobile
            mail
            address
            orders {
              id
            }
          }}`,
        variables: {}
      }
    });
  }, []);

  if (!elementsStore.customers) {
    return <Loader />;
  }

  return (
    <>
      <MainCard
        title="All Customers"
        content={false}
        sx={{ marginBottom: '24px' }}
        secondary={
          <Link to={'../add-customer'}>
            <Fab color="primary" size="small" aria-label="Add Order">
              <AddIcon />
            </Fab>
          </Link>
        }
      ></MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <MainCard contentSX={{ padding: '0 !important' }} title="Customers">
            <CustomTable uniqueKey={'id'} tableHeadings={ADD_CUSTOMER_DATA.tableHeading} tableData={elementsStore.customers} />
          </MainCard>
        </Grid>
        {/* <Grid item lg={5} md={5} sm={6} xs={12}>
          <MainCard contentSX={{ padding: '0 !important' }} title="Add New Role">
            <div>Add</div>
          </MainCard>
        </Grid> */}
      </Grid>
    </>
  );
};

export default Customers;
