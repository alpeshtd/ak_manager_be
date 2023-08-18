import { Grid } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import CustomTable from 'ui-component/CustomTable';
import ADD_ORDER_DATA from 'defaults/addOrderFields';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'ui-component/Loader';

// ==============================|| TYPOGRAPHY ||============================== //

const Orders = () => {
  const dispatch = useDispatch();
  const overviewState = useSelector(state=> state.overview)
  useEffect(() => {
    dispatch({
      type: 'ORDERS_FETCH_REQUESTED',
      payload: {
        // operationName: 'userRoles',
        query: `query {
          orders {
            id
            name
            customer {
              name
            }
            orderT
            performedById {
              firstName
            }
            performedT
            description
            status
          }}`,
        variables: {}
      }
    });
  }, []);

  if (!overviewState.orders) {
    return <Loader />;
  }

  return (
    <>
      <MainCard
        title="All Orders"
        content={false}
        sx={{ marginBottom: '24px' }}
        secondary={
          <Link to={'../add-order'}>
            <Fab color="primary" size="small" aria-label="Add Order">
              <AddIcon />
            </Fab>
          </Link>
        }
      ></MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <MainCard contentSX={{ padding: '0 !important' }} title="Orders">
            <CustomTable tableHeadings={ADD_ORDER_DATA.tableHeading} tableData={overviewState.orders} />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Orders;
