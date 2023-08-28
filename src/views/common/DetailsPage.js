import allDefaultData from 'defaults/defaultIndex';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Card, Divider, Grid, useTheme } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Loader from 'ui-component/Loader';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import moment from 'moment';
import SubCard from 'ui-component/cards/SubCard';
import { fetchVal } from 'utils/utils';

const DetailsPage = () => {
  const [CONFIG_DATA, setCONFIG_DATA] = useState(null);
  const [details, setDetails] = useState(null);
  const [detailsTableData, setDetailsTableData] = useState();
  const theme = useTheme();
  const {
    state: { id, slug }
  } = useLocation();

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
    defData.detailsTableReq &&
      defData
        .detailsTableReq({
          query: defData.detailsTableQuery,
          variables: { id }
        })
        .then((res) => {
          const formatedData = defData.formatDetailsTableData(res);
          setDetailsTableData(formatedData);
        });
  }, [id, slug]);

  if (!CONFIG_DATA || !details) {
    return <Loader />;
  }

  const getVal = (headData) => {
    const { dataKey, valFunc, hideIn } = headData;
    if (hideIn && hideIn == 'details') {
      return null;
    }
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
  };

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
              {Object.keys(CONFIG_DATA.tableHeading).map((k) => {
                const temoObj = CONFIG_DATA.tableHeading[k];
                if (temoObj.hideIn && temoObj.hideIn == 'details') {
                  return null;
                }
                return (
                  <Grid key={k} item lg={3} md={3} sm={4} xs={6}>
                    <div style={{ fontWeight: 700 }}>{temoObj.label}</div>
                    <div>{getVal(temoObj)}</div>
                  </Grid>
                );
              })}
            </Grid>
            <Divider sx={{marginTop: '20px', marginBottom: '30px'}} />
            { detailsTableData && detailsTableData.render ? detailsTableData.render : null}
            {detailsTableData ? (
              <SubCard title="Statement" sx={{ marginTop: '20px' }}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {detailsTableData.columns.map((col) => {
                          return <TableCell key={col}>{col}</TableCell>;
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {detailsTableData.rows.map((row) => (
                        <TableRow key={row[0]} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          {row.map((r) => {
                            return (
                              <TableCell key={r} component="th" scope="row">
                                {r}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </SubCard>
            ) : null}
            <SubCard title="Change Log" sx={{ marginTop: '20px' }}>
              <div>
                {details.changeLog.map((log, index) => {
                  return (
                    <Card key={index} variant="outlined" sx={{ marginBottom: '10px', p: 1 }}>
                      {log}
                    </Card>
                  );
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
