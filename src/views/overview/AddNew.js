import { Alert, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
// import ADD_ORDER_DATA from '../../defaults/addOrderFields';
import Field from 'ui-component/Field';
import allDefaultData from 'defaults/defaultIndex';
import { useState } from 'react';
import { useEffect } from 'react';
import SubCard from 'ui-component/cards/SubCard';
// import { generateVariables } from 'utils/utils';
import { addDataCommon, updateDataCommon } from 'api/api';
import ApiLoader from 'ui-component/ApiLoader';
import { useDispatch, useSelector } from 'react-redux';

// ==============================|| TYPOGRAPHY ||============================== //

const AddNew = () => {
  const dispatch = useDispatch();
  const appStore = useSelector(store => store.app)
  const [selectedData, setSelectedData] = useState();
  // const [loadedData, setLoadedData] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);
  const [changeLog, setChangeLog] = useState({});
  const [isError, setIsError] = useState(false);
  let { state } = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (state && state.prevData && state.slug) {
      const mainData = { ...allDefaultData[state.slug] };
      const updatedFields = { ...mainData.fields };
      Object.entries(state.prevData).forEach(([key, val]) => {
        if (!updatedFields[key]) {
          return;
        }
        updatedFields[key].value = updatedFields[key].setValue && val ? updatedFields[key].setValue(val) : val;
      });
      // setLoadedData({
      //   ...mainData,
      //   fields: {
      //     ...updatedFields
      //   }
      // });
      setSelectedData({
        ...mainData,
        fields: {
          ...updatedFields
        }
      });
    } else if (state.new && state.slug) {
      setSelectedData({ ...allDefaultData[state.slug] });
    }
  }, [state]);

  if (!selectedData) {
    return (
      <SubCard>
        <div>Loading....</div>
      </SubCard>
    );
  }

  // function dependancyRecursionFunc(fields, mainKey) {
  //   if (fields[mainKey] && fields[mainKey].dependant) {
  //     fields[mainKey].dependant.forEach((key) => {
  //       fields[key] = fields[key].dependancyFunc(fields, key, mainKey);
  //     });
  //   }
  // }

  const fieldChangeHandler = (val, field) => {
    if(isError) {
      setIsError(false);
    }
    const updatedFields = { ...selectedData.fields };
    updatedFields[field].value = val;
    if (state && state.edit) {
      setChangeLog({
        ...changeLog,
        [field]: {
          old: state.prevData && state.prevData[field] ? state.prevData[field] : '',
          new: val
        }
      });
    }

    function dependancyRecursionFunc(mainKey) {
      if (updatedFields[mainKey] && updatedFields[mainKey].dependant) {
        updatedFields[mainKey].dependant.forEach((key) => {
          updatedFields[key] = updatedFields[key].dependancyFunc(updatedFields, key, mainKey);
          if (updatedFields[key].dependant) {
            dependancyRecursionFunc(key)
          }
        });
      }
    }
    dependancyRecursionFunc(field);

    setSelectedData({
      ...selectedData,
      fields: {
        ...updatedFields
      }
    });
  };

  const addClickHandler = () => {

    setShowLoading(true);

    const keyValObj = {
      performedById: appStore.user.id,
      performedT: '' + new Date().getTime(),
      ...(state && state.edit ? { id: state.prevData.id } : undefined),
      ...(state && state.edit
        ? { changeLog: [JSON.stringify(changeLog), ...(state.prevData.changeLog ? state.prevData.changeLog : [])] }
        : undefined)
    };

    let payload = {};
    Object.entries(selectedData.fields).map(([field, data]) => {
      keyValObj[field] = data.value;
    });
    const isAllFilled = Object.keys(keyValObj).every(k=>{
      return !!keyValObj[k];
    })
    if(!isAllFilled) {
      setIsError(true);
      setShowLoading(false);
      return;
    }
    if (selectedData.extractValues) {
      Object.entries(selectedData.extractValues).forEach(([k, path]) => {
        if (!keyValObj[k]) {
          return;
        }
        let finalVal = keyValObj[k];
        for (let key of path) {
          if (finalVal) {
            finalVal = finalVal[key] || null;
          }
        }
        keyValObj[k] = finalVal;
      });
    }
    if (selectedData.addNew) {
      payload = selectedData.addNew(keyValObj);
    } else {
      payload = {
        // operationName: 'userRoles',
        query: state && state.edit ? selectedData.updateQuery : selectedData.addNewQuery,
        // variables: generateVariables(keyValObj)
        variables: keyValObj
      };
    }
    if (state && state.edit) {
      updateDataCommon(payload)
        .then(() => {
          setApiStatus('success');
          dispatch({
            type: allDefaultData[state.slug].getDispatchType,
            payload: {
              query: allDefaultData[state.slug].getQuery,
              variables: {}
            }
          });
          navigate(-1);
        })
        .catch(() => {
          setApiStatus('failed');
        });
      return;
    }
    addDataCommon(payload)
      .then(() => {
        setApiStatus('success');
        dispatch({
          type: allDefaultData[state.slug].getDispatchType,
          payload: {
            query: allDefaultData[state.slug].getQuery,
            variables: {}
          }
        });
        navigate(-1);
      })
      .catch(() => {
        setApiStatus('failed');
      });
  };

  const onSetShowLoading = (flag) => {
    setShowLoading(flag);
  };

  return (
    <MainCard title={`${state && state.edit ? 'Update' : 'Add New'} ${selectedData.label}`}>
      <ApiLoader showLoading={showLoading} setShowLoading={onSetShowLoading} apiStatus={apiStatus} />
      {isError && <Alert sx={{ marginBottom: '25px'}} severity="error" onClose={() => setIsError(false)}>Please fill all fields!</Alert>}
      <Grid container spacing={gridSpacing}>
        {selectedData.fields &&
          Object.keys(selectedData.fields).map((field) => {
            const fieldDetails = selectedData.fields[field];
            return (
              <Grid key={field} item lg={4} md={4} sm={6} xs={12}>
                <Field details={fieldDetails} onFieldChange={(val) => fieldChangeHandler(val, field)} />
              </Grid>
            );
          })}
      </Grid>
      <Stack direction="row" spacing={2} sx={{ marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={addClickHandler}>
          {state && state.edit ? 'Update' : 'Add'}
        </Button>
        <Button variant="contained" color="error" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </Stack>
    </MainCard>
  );
};

export default AddNew;
