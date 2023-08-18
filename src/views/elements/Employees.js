import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'ui-component/Loader';
import CustomTable from 'ui-component/CustomTable';
import ADD_EMPLOYEE_DATA from 'defaults/addEmployees';
import { useEffect } from 'react';

// ==============================|| TYPOGRAPHY ||============================== //

const Employees = () => {
  const dispatch = useDispatch();
  const elementsStore = useSelector((state) => state.elements);
  useEffect(() => {
    dispatch({
      type: 'EMPLOYEES_FETCH_REQUESTED',
      payload: {
        // operationName: 'userRoles',
        query: `query {
          employees {
            id
            name
            address
            mobile
            joiningT
            position
            perDay
            performedById {
              firstName
            }
            performedT
          }}`,
        variables: {}
      }
    });
  }, []);

  if (!elementsStore.employees) {
    return <Loader />;
  }

  return (
    <>
      <MainCard
        title="All Employees"
        content={false}
        sx={{ marginBottom: '24px' }}
        secondary={
          <Link to={'../add-employee'}>
            <Fab color="primary" size="small" aria-label="Add Order">
              <AddIcon />
            </Fab>
          </Link>
        }
      ></MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <MainCard contentSX={{ padding: '0 !important' }} title="Employees">
            <CustomTable uniqueKey={'id'} tableHeadings={ADD_EMPLOYEE_DATA.tableHeading} tableData={elementsStore.employees} />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Employees;
