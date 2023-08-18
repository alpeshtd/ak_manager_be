import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import CustomTable from 'ui-component/CustomTable';
import ADD_VENDOR_DATA from 'defaults/addVendor';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'ui-component/Loader';

// ==============================|| TYPOGRAPHY ||============================== //

const Vendors = () => {
  const dispatch = useDispatch();
  const elementsStore = useSelector(state=> state.elements)

  useEffect(() => {
    dispatch({
      type: 'VENDORS_FETCH_REQUESTED',
      payload: {
        // operationName: 'userRoles',
        query: `query {
          vendors {
            id
            name
            mobile
            mail
            address
            purchases {
              id
            }
          }}`,
        variables: {}
      }
    });
  }, []);

  if (!elementsStore.vendors) {
    return <Loader />;
  }

  return (
    <>
      <MainCard
        title="All Vendors"
        content={false}
        sx={{ marginBottom: '24px' }}
        secondary={
          <Link to={'../add-vendor'}>
            <Fab color="primary" size="small" aria-label="Add Order">
              <AddIcon />
            </Fab>
          </Link>
        }
      ></MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <MainCard contentSX={{ padding: '0 !important' }} title="Vendors">
            <CustomTable uniqueKey={'id'} tableHeadings={ADD_VENDOR_DATA.tableHeading} tableData={elementsStore.vendors} />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Vendors;
