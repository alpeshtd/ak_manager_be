import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import CustomTable from 'ui-component/CustomTable';
import ADD_USER_DATA from 'defaults/addUser';
import { useSelector } from 'react-redux';
import Loader from 'ui-component/Loader';

// ==============================|| TYPOGRAPHY ||============================== //

const Users = () => {
  const elementsStore = useSelector((store) => store.elements);

  if (!elementsStore.users) {
    return <Loader />;
  }

  return (
    <>
      <MainCard
        title="All Users"
        content={false}
        sx={{ marginBottom: '24px' }}
        secondary={
          <Link to={'../add-user'}>
            <Fab color="primary" size="small" aria-label="Add Order">
              <AddIcon />
            </Fab>
          </Link>
        }
      ></MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <MainCard contentSX={{ padding: '0 !important' }} title="Users">
            <CustomTable uniqueKey={'id'} tableHeadings={ADD_USER_DATA.tableHeading} tableData={elementsStore.users} />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Users;
