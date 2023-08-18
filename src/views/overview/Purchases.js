import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import CustomTable from 'ui-component/CustomTable';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ADD_PURCHASE_DATA from 'defaults/addPurchases';
import Loader from 'ui-component/Loader';

// ==============================|| TYPOGRAPHY ||============================== //

const Purchases = () => {
  const dispatch = useDispatch();
  const overviewState = useSelector(state=> state.overview)

  useEffect(() => {
    dispatch({
      type: 'PURCHASES_FETCH_REQUESTED',
      payload: {
        // operationName: 'userRoles',
        query: `query {
          purchases {
    id
    quantity
    purchaseRate
    totalAmount
    vendorId {
      name
    }
    purchaseById {
      firstName
    }
    purchaseT
    paidAmount
    orderId {
      name
    }
    remainingAmount
    paymentMode
    description
    purchaseTypeId {
      type
    }
    purchaseStatus
    performedById {
      firstName
    }
    performedT
    transactionType
    purchaseConfirmedById {
      firstName
    }
  }}`,
        variables: {}
      }
    });
  }, []);

  if (!overviewState.purchases) {
    return <Loader />;
  }

  return (
    <>
      <MainCard
        title="All Purchases"
        content={false}
        sx={{ marginBottom: '24px' }}
        secondary={
          <Link to={'../add-purchase'}>
            <Fab color="primary" size="small" aria-label="Add Order">
              <AddIcon />
            </Fab>
          </Link>
        }
      ></MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <MainCard contentSX={{ padding: '0 !important' }} title="Purchases">
            <CustomTable uniqueKey={'id'} tableHeadings={ADD_PURCHASE_DATA.tableHeading} tableData={overviewState.purchases} />
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

export default Purchases;
