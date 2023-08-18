import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CustomTable from 'ui-component/CustomTable';
import ADD_UTILIZATION_DATA from 'defaults/addUtilization';
import Loader from 'ui-component/Loader';

// ==============================|| TYPOGRAPHY ||============================== //

const Utilizations = () => {
  const dispatch = useDispatch();
  const overviewState = useSelector(state=> state.overview);

  useEffect(() => {
    dispatch({
      type: 'UTILIZATIONS_FETCH_REQUESTED',
      payload: {
        // operationName: 'userRoles',
        query: `query {
          utilizations {
            id
            stockId {
              type
            }
            quantity
            utilizationById {
              firstName
            }
            utilizationT
            orderId {
              name
            }
            performedById {
              firstName
            }
            performedT
            description
          }}`,
        variables: {}
      }
    });
  }, []);

  if (!overviewState.utilizations) {
    return <Loader />;
  }

  return (
    <>
      <MainCard
        title="All Utilizations"
        content={false}
        sx={{ marginBottom: '24px' }}
        secondary={
          <Link to={'../add-utilization'}>
            <Fab color="primary" size="small" aria-label="Add Order">
              <AddIcon />
            </Fab>
          </Link>
        }
      ></MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <MainCard contentSX={{ padding: '0 !important' }} title="Utilizations">
            <CustomTable uniqueKey={'id'} tableHeadings={ADD_UTILIZATION_DATA.tableHeading} tableData={overviewState.utilizations} />
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

export default Utilizations;
