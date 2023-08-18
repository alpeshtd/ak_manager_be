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
import ADD_STOCK_DATA from 'defaults/addStock';
import Loader from 'ui-component/Loader';

// ==============================|| TYPOGRAPHY ||============================== //

const Stock = () => {
  const dispatch = useDispatch();
  const elementsStore = useSelector((state) => state.elements);
  useEffect(() => {
    dispatch({
      type: 'STOCKS_FETCH_REQUESTED',
      payload: {
        // operationName: 'userRoles',
        query: `query {
          stocks {
            id
            type
            quantity
            rate
            unit
          }}`,
        variables: {}
      }
    });
  }, []);
  
  if (!elementsStore.stocks) {
    return <Loader />;
  }

  return (
    <>
      <MainCard
        title="All Stock"
        content={false}
        sx={{ marginBottom: '24px' }}
        secondary={
          <Link to={'../add-stock'}>
            <Fab color="primary" size="small" aria-label="Add Order">
              <AddIcon />
            </Fab>
          </Link>
        }
      ></MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <MainCard contentSX={{ padding: '0 !important' }} title="Stock">
            <CustomTable uniqueKey={'id'} tableHeadings={ADD_STOCK_DATA.tableHeading} tableData={elementsStore.stocks} />
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

export default Stock;
