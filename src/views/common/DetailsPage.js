import allDefaultData from 'defaults/defaultIndex';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Card, Divider, Grid, useTheme } from '@mui/material';

import Loader from 'ui-component/Loader';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import moment from 'moment';
import SubCard from 'ui-component/cards/SubCard';
import { fetchVal } from 'utils/utils';

const DetailsPage = () => {
  const [CONFIG_DATA, setCONFIG_DATA] = useState(null);
  const [details, setDetails] = useState(null);
  const theme = useTheme();
  const {
    state: { id, slug }
  } = useLocation();
  console.log('Id slug', id, slug);
  useEffect(() => {
    if (!id || !slug) {
      return;
    }
    const defData = allDefaultData[slug];
    setCONFIG_DATA({ ...defData });
    const reqPayload = {
      query: defData.getSingleQuery,
      variables: { id }
    };
    defData.getSingleReq(reqPayload).then((res) => {
      setDetails(res[defData.dbKey]);
    });
  }, [id, slug]);

  if (!CONFIG_DATA || !details) {
    return <Loader />;
  }

  const getVal = (headData) => {
    const { dataKey, valFunc } = headData;
    let cellLabel;
    switch (dataKey) {
        case 'actions':
        case 'viewMore':
          cellLabel = null;
          break;
        default:
          cellLabel = Array.isArray(dataKey) ? fetchVal(dataKey, details) : details[dataKey];
          if (valFunc) {
            cellLabel = valFunc(cellLabel);
          }
      }
  
      return cellLabel;
  }

  return (
    <>
      <MainCard title={CONFIG_DATA.label + ' Details'} content={false} sx={{ marginBottom: '24px' }}></MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <MainCard>
            <div style={{ display: 'flex', flexWrap: 'wrap', color: theme.palette.grey[400] }}>
              <span style={{ paddingRight: 10 }}>Performed By: {details.performedById.firstName}</span>
              <span>Performed On: {moment(+details.performedT).format('MMMM DD, YYYY hh:mma')}</span>
            </div>
            <Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />
            <Grid container spacing={gridSpacing}>
                {Object.keys(CONFIG_DATA.tableHeading).map(k => {
                    const temoObj = CONFIG_DATA.tableHeading[k];
                    return <Grid key={k} item lg={3} md={3} sm={4} xs={6}>
                    <div style={{ fontWeight: 700 }}>{temoObj.label}</div>
                    <div>{getVal(temoObj)}</div>
                  </Grid>
                })}
            </Grid>
            {/* <Divider sx={{marginTop: '10px', marginBottom: '10px'}} /> */}
            <SubCard title="Change Log" sx={{ marginTop: '20px' }}>
              <div>
                {details.changeLog.map((log, index) => {
                  return <Card key={index} variant="outlined" sx={{marginBottom: '10px', p:1}}>{log}</Card>;
                })}
              </div>
            </SubCard>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default DetailsPage;
