import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from 'ui-component/CustomTable';
import ADD_INCOME_DATA from 'defaults/addIncomes';
import Loader from 'ui-component/Loader';

// ==============================|| TYPOGRAPHY ||============================== //

const Incomes = () => {
  const dispatch = useDispatch();
  const overviewState = useSelector((state) => state.overview);
  useEffect(() => {
    dispatch({
      type: 'INCOMES_FETCH_REQUESTED',
      payload: {
        // operationName: 'userRoles',
        query: `query {
          incomes {
            id
            amount
            customerId {
              name
            }
            transactionType
            orderId {
              name
            }
            incomeT
            receivedById {
              firstName
            }
            performedById {
              firstName
            }
            performedT
            description
            paymentMode
          }}`,
        variables: {}
      }
    });
  }, []);

  if (!overviewState.incomes) {
    return <Loader />;
  }

  return (
    <>
      <MainCard
        title="All Incomes"
        content={false}
        sx={{ marginBottom: '24px' }}
        secondary={
          <Link to={'../add-income'}>
            <Fab color="primary" size="small" aria-label="Add Order">
              <AddIcon />
            </Fab>
          </Link>
        }
      ></MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <MainCard contentSX={{ padding: '0 !important' }} title="Incomes">
            <CustomTable uniqueKey={'id'} tableHeadings={ADD_INCOME_DATA.tableHeading} tableData={overviewState.incomes} />
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

export default Incomes;
