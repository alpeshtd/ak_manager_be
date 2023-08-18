import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector } from 'react-redux';
import InputAdornment from '@mui/material/InputAdornment';

const Field = (props) => {
  const storeData = useSelector((state) => state);
  const { type, label, options, value, multiple, setOptions, endAdornment, helperText, error, disabled } = props.details;

  const setOptionHandle = () => {
    let ret;
    try{
      ret = setOptions(storeData)
    }catch(err){
      console.log(err);
      ret = options
    }
    return ret;
  }

  return (
    <div style={{ width: '100%' }}>
      {type === 'text' && (
        <TextField
          fullWidth
          disabled={disabled || false}
          error={error || false}
          label={label}
          id="outlined-size-small"
          size="small"
          value={value}
          helperText={helperText || ''}
          onChange={(event) => {
            props.onFieldChange(event.target.value);
          }}
          InputProps={{
            ...(endAdornment ? {endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>} : undefined),
          }}
        />
      )}
      {type === 'number' && (
        <TextField
          fullWidth
          type="number"
          disabled={disabled || false}
          error={error || false}
          label={label}
          id="outlined-size-small"
          size="small"
          value={value}
          helperText={helperText || ''}
          onChange={(event) => {
            props.onFieldChange(+event.target.value);
          }}
          InputProps={{
            ...(endAdornment ? {endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>} : undefined),
          }}
        />
      )}
      {type === 'textArea' && (
        <TextField
          fullWidth
          multiline
          minRows={4}
          label={label}
          id="outlined-size-small"
          size="small"
          value={value}
          onChange={(event) => {
            props.onFieldChange(event.target.value);
          }}
        />
      )}
      {type === 'select' && (
        <Autocomplete
          multiple={multiple}
          disablePortal
          size="small"
          id="combo-box-demo"
          options={setOptions ? setOptionHandle() : options}
          value={value}
          //   sx={{ width: 300 }}
          onChange={(event, newValue) => {
            props.onFieldChange(newValue);
          }}
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      )}
      {type === 'date' && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            sx={{ width: '100%' }}
            fullWidth
            label={label}
            slotProps={{ textField: { size: 'small' } }}
            onChange={(newValue) => props.onFieldChange('' + newValue.getTime())}
            value={new Date(+value)}
          />
        </LocalizationProvider>
      )}
    </div>
  );
};

export default Field;
