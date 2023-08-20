import { Grid, Typography, useTheme, Button } from '@mui/material';
import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Notification = ({ data, isCEO, actionHandler, type, _id }) => {
  const theme = useTheme();
  let status = null;
  let confirmedBy = null;
  let content = null;
  switch (type) {
    case 'Purchase':
      status = data.purchaseStatus.value;
      confirmedBy = data.purchaseConfirmedById?.firstName;
      content = (
        <>
          <div>
            Amount: <b>{data.totalAmount}</b>{' '}
            <span>
              Paid: <b>{data.paidAmount}</b>
            </span>
          </div>
          <div>
            <span>
              Item: <b>{data.purchaseTypeId.type}</b>
            </span>{' '}
            <span>
              QTY: <b>{data.quantity + '' + data.purchaseTypeId.unit}</b>
            </span>
          </div>
          <div>
            Requested by: <b>{data.purchaseById.name}</b>
          </div>
        </>
      );
      break;
    case 'Expense':
      status = data.expenseStatus.value;
      confirmedBy = data.expenseConfirmedById?.firstName;
      content = (
        <>
          <div>
            Amount: <b>{data.amount}</b>{' '}
            <span>
              Paid: <b>{data.paidAmount}</b>
            </span>
          </div>
          <div>
            <span>
              Details: <b>{data.description}</b>
            </span>
          </div>
          <div>
            Requested by: <b>{data.expenseById.name}</b>
          </div>
        </>
      );
      break;
    default:
      return;
  }
  return (
    <Grid container direction="column" className="list-container">
      <Grid item xs={12} sx={{ pb: 2 }}>
        <Typography variant="subtitle2">{content}</Typography>
      </Grid>
      <Grid item xs={12}>
        {['approved', 'rejected'].includes(status) ? (
          <Grid item>
            <span style={{ color: status == 'approved' ? theme.palette.success.dark : theme.palette.error.dark }}>
              {status.toUpperCase()}
            </span>{' '}
            by {confirmedBy}
          </Grid>
        ) : isCEO ? (
          <Grid container>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                disableElevation
                endIcon={<CheckCircleOutlineIcon size="small" />}
                onClick={() => actionHandler('approved', type, data, _id)}
              >
                Approve
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                sx={{ marginLeft: '5px' }}
                color="error"
                variant="contained"
                disableElevation
                endIcon={<HighlightOffIcon size="small" />}
                onClick={() => actionHandler('rejected', type, data, _id)}
              >
                Reject
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid item>
            <span style={{ color: theme.palette.primary.dark }}>{status.toUpperCase()}</span>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Notification;
