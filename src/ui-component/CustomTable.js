import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { makeRandomId } from 'utils/utils';
import { deleteDocument } from 'api/api';
import { useState } from 'react';
import ApiLoader from './ApiLoader';
import allDefaultData from 'defaults/defaultIndex';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationPopUp from './ConfirmationPopUp';
import CustomizedMenus from './CustomMenu';
import { useEffect } from 'react';

const fetchVal = (keyArr, dataObj) => {
  if (!dataObj) {
    return null;
  }
  let extractedVal = { ...dataObj };
  const keyLen = keyArr.length;
  let isValid = true;
  let pos = 0;
  while (isValid && pos < keyLen) {
    if (Array.isArray(keyArr[pos])) {
      if (!extractedVal || !extractedVal.length) {
        isValid = false;
        extractedVal = null;
        break;
      }
      extractedVal = extractedVal.map((v) => v[keyArr[pos][0]]);
      break;
    } else if (!extractedVal[keyArr[pos]]) {
      isValid = false;
      extractedVal = null;
      break;
    }
    extractedVal = extractedVal[keyArr[pos]];
    pos += 1;
  }
  return extractedVal;
};

const CustomTable = ({ tableHeadings, tableData, page }) => {
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);
  const [docDeleteId, setDocDeleteId] = useState(false);
  const [showConfirmationPopUp, setShowConfirmationPopUp] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);
  const appStore = useSelector(store => store.app);
  const [allowedActions, setAllowedActions] = useState([]);

  useEffect(() => {
    if (!appStore.loggedUserRole) {
      return;
    }
    const tempAccess = appStore.loggedUserRole.access.map((acc) => acc.value);
    setAllowedActions(tempAccess);
  }, [appStore.loggedUserRole]);

  const deleteClickHandler = (id) => {
    setShowConfirmationPopUp(true);
    setDocDeleteId(id);
  };

  const deleteConfirmHandler = () => {
    setShowConfirmationPopUp(false);
    setShowLoading(true);
    deleteDocument(docDeleteId, page)
      .then(() => {
        setApiStatus('success');
        dispatch({
          type: allDefaultData[page].getDispatchType,
          payload: {
            query: allDefaultData[page].getQuery,
            variables: {}
          }
        });
      })
      .catch(() => {
        setApiStatus('failed');
      });
  };

  const thSX = {
    '@media (max-width: 900px)': {
      padding: '10px',
    }
  }

  const tdSX = {
    '@media (max-width: 900px)': {
      padding: '10px',
    }
  }

  const getHead = (headData, th) => {
    const { label, sx, align } = headData;
    switch (th) {
      case 'actions':
        if (!allowedActions || !allowedActions.length) {
          return;
        }
        break;
      default:
        break;
    }
    return (
      <TableCell key={th} sx={{...sx, ...thSX}} align={align}>
        {label}
      </TableCell>
    );
  };

  const getCell = (headData, data, th) => {
    const { dataKey, sx, align, valFunc } = headData;
    let cellLabel;
    switch (dataKey) {
      case 'actions':
      case 'viewMore':
        if (!allowedActions || !allowedActions.length) {
          return;
        }
        cellLabel = <CustomizedMenus allowedActions={allowedActions} data={data} page={page} deleteClickHandler={deleteClickHandler} />;
        break;
      default:
        cellLabel = Array.isArray(dataKey) ? fetchVal(dataKey, data) : data[dataKey];
        if (valFunc) {
          cellLabel = valFunc(cellLabel);
        }
    }

    return (
      <TableCell key={th} sx={{...sx, ...tdSX}} align={align}>
        {cellLabel}
      </TableCell>
    );
  };

  return (
    <>
      <ConfirmationPopUp
        color="error"
        open={showConfirmationPopUp}
        handleClose={() => setShowConfirmationPopUp(false)}
        handleConfirm={deleteConfirmHandler}
        title="Are you sure?"
        description="Are you sure you want to delete this entry?"
      />
      <ApiLoader showLoading={showLoading} setShowLoading={setShowLoading} apiStatus={apiStatus} />
      <TableContainer component={Paper}>
        <Table sx={{}} aria-label="Orders table">
          <TableHead>
            <TableRow>
              {Object.keys(tableHeadings).map((th) => {
                return getHead(tableHeadings[th], th);
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((td) => {
              return (
                <TableRow key={makeRandomId(5)} hover>
                  {Object.keys(tableHeadings).map((th) => {
                    return getCell(tableHeadings[th], td, th);
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomTable;
