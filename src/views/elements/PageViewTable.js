import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'ui-component/Loader';
import CustomTable from 'ui-component/CustomTable';
// import ADD_USER_ROLE_DATA from 'defaults/addUserRole';
import allDefaultData from 'defaults/defaultIndex';
import { useState } from 'react';

// ==============================|| TYPOGRAPHY ||============================== //

const PageViewTable = (props) => {
  const dispatch = useDispatch();
  const STORE = useSelector((store) => store);
  const [allowedActions, setAllowedActions] = useState([]);
  useEffect(() => {
    if (!STORE.app.loggedUserRole) {
      return;
    }
    const tempAccess = STORE.app.loggedUserRole.access.map((acc) => acc.value);
    setAllowedActions(tempAccess);
  }, [STORE.app.loggedUserRole]);

  const [elementsStore, setElementsStore] = useState(null);
  const [CONFIG_DATA, setCONFIG_DATA] = useState(null);

  useEffect(() => {
    if (props.slug && allDefaultData[props.slug] && STORE) {
      setCONFIG_DATA({ ...allDefaultData[props.slug] });
      let res = null;
      allDefaultData[props.slug].storePath.forEach((item, index) => (res = index == 0 ? STORE[item] : res[item]));

      setElementsStore(res);
    }
  }, [props.slug, STORE]);

  // useEffect(() => {
  //   dispatch({
  //     type: ADD_USER_ROLE_DATA.getDispatchType,
  //     payload: {
  //       query: ADD_USER_ROLE_DATA.getQuery,
  //       variables: {}
  //     }
  //   });
  // }, []);

  if (!elementsStore) {
    return <Loader />;
  }

  const refreshHandler = () => {
    dispatch({
      type: allDefaultData[props.slug].getDispatchType,
      payload: {
        query: allDefaultData[props.slug].getQuery,
        variables: {}
      }
    });
  };

  return (
    <>
      <MainCard
        title={CONFIG_DATA.mainCardTitle}
        content={false}
        sx={{ marginBottom: '24px' }}
        secondary={
          <>
            <Fab color="action" sx={{ marginRight: '10px' }} size="small" aria-label="Refresh">
              <RefreshIcon onClick={refreshHandler} />
            </Fab>
            {(allowedActions.includes('add') || allowedActions.includes('superUser')) && (
              <Link to={'../add-new-data'} state={{ slug: CONFIG_DATA.slug, new: true }}>
                <Fab color="primary" size="small" aria-label="Add New">
                  <AddIcon />
                </Fab>
              </Link>
            )}
          </>
        }
      ></MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <MainCard contentSX={{ padding: '0 !important' }} title={CONFIG_DATA.tableTitle}>
            <CustomTable tableHeadings={CONFIG_DATA.tableHeading} tableData={elementsStore} uniqueKey={'id'} page={CONFIG_DATA.slug} />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default PageViewTable;
