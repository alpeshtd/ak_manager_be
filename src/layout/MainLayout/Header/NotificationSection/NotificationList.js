// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
  Badge
} from '@mui/material';

// assets
import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto } from '@tabler/icons';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import User1 from 'assets/images/users/user-round.svg';
import { formatTimestampToDate } from 'utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import allDefaultData from 'defaults/defaultIndex';
import { updateNotifications } from 'api/api';
import { useEffect } from 'react';
import { useState } from 'react';

// styles
const ListItemWrapper = styled('div')(() => ({
  cursor: 'pointer',
  padding: 16,
  // '&:hover': {
  //   background: theme.palette.primary.light
  // },
  '& .MuiListItem-root': {
    padding: 0
  }
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = (props) => {
  const { notifications } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const appStore = useSelector((store) => store.app);
  const [isCEO, setIsCEO] = useState(false);

  const chipSX = {
    height: 24,
    padding: '0 6px'
  };
  const chipErrorSX = {
    ...chipSX,
    color: theme.palette.orange.dark,
    backgroundColor: theme.palette.orange.light,
    marginRight: '5px'
  };

  const chipWarningSX = {
    ...chipSX,
    color: theme.palette.warning.dark,
    backgroundColor: theme.palette.warning.light
  };

  const chipSuccessSX = {
    ...chipSX,
    color: theme.palette.success.dark,
    backgroundColor: theme.palette.success.light,
    height: 28
  };

  const actionHandler = (action, type, data, id) => {
    const DEF_RELATION = {
      Purchase: 'overview/purchase'
    };
    dispatch({
      type: allDefaultData[DEF_RELATION[type]].getDispatchType,
      payload: {
        query: allDefaultData[DEF_RELATION[type]].updateQuery,
        variables: allDefaultData[DEF_RELATION[type]].updateStatus(action, data, appStore.user.id)
      }
    });
    updateNotifications({ id, unread: false }).then(() => {
      dispatch({
        type: 'NOTIFICATIONS_FETCH_REQUESTED',
        payload: {}
      });
    });
  };

  useEffect(() => {
    if (!appStore.loggedUserRole) {
      return;
    }
    const tempIsCEO = appStore.loggedUserRole.access.find((acc) => acc.value === 'superUser');
    setIsCEO(tempIsCEO);
  }, [appStore.loggedUserRole]);

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 330,
        py: 0,
        borderRadius: '10px',
        [theme.breakpoints.down('md')]: {
          maxWidth: 300
        },
        '& .MuiListItemSecondaryAction-root': {
          top: 22
        },
        '& .MuiDivider-root': {
          my: 0
        },
        '& .list-container': {
          pl: 7
        }
      }}
    >
      {notifications.map(({ type, data, unread, _id }) => {
        return (
          <div key={data.id}>
            <ListItemWrapper sx={unread ? { backgroundColor: theme.palette.primary.light } : {}}>
              <ListItem alignItems="center">
                <ListItemAvatar>
                  <StyledBadge
                    invisible={!unread}
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
                    <Avatar alt="John Doe" src={User1} />
                  </StyledBadge>
                </ListItemAvatar>
                <ListItemText primary={type} />
                <ListItemSecondaryAction>
                  <Grid container justifyContent="flex-end">
                    <Grid item xs={12}>
                      <Typography variant="caption" display="block" gutterBottom>
                        {formatTimestampToDate(data.performedT, 'DD MMM hh:mm A')}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItemSecondaryAction>
              </ListItem>
              <Grid container direction="column" className="list-container">
                <Grid item xs={12} sx={{ pb: 2 }}>
                  <Typography variant="subtitle2">
                    <div>Amount: <b>{data.totalAmount}</b>   <span>Paid: <b>{data.paidAmount}</b></span></div>
                    <div><span>Item: <b>{data.purchaseTypeId.type}</b></span>   <span>QTY: <b>{data.quantity + '' + data.purchaseTypeId.unit}</b></span></div>
                    <div>Requested by: <b>{data.purchaseById.name}</b></div>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {['approved', 'rejected'].includes(data.purchaseStatus.value) ? (
                    <Grid item>
                      <span
                        style={{ color: data.purchaseStatus.value == 'approved' ? theme.palette.success.dark : theme.palette.error.dark }}
                      >
                        {data.purchaseStatus.value.toUpperCase()}
                      </span>{' '}
                      by {data.purchaseConfirmedById?.firstName}
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
                      <span style={{ color: theme.palette.primary.dark }}>{data.purchaseStatus.value.toUpperCase()}</span>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </ListItemWrapper>
            <Divider />
          </div>
        );
      })}
      {false && (
        <>
          <ListItemWrapper>
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Avatar alt="John Doe" src={User1} />
              </ListItemAvatar>
              <ListItemText primary="John Doe" />
              <ListItemSecondaryAction>
                <Grid container justifyContent="flex-end">
                  <Grid item xs={12}>
                    <Typography variant="caption" display="block" gutterBottom>
                      2 min ago
                    </Typography>
                  </Grid>
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
            <Grid container direction="column" className="list-container">
              <Grid item xs={12} sx={{ pb: 2 }}>
                <Typography variant="subtitle2">It is a long established fact that a reader will be distracted</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item>
                    <Chip label="Unread" sx={chipErrorSX} />
                  </Grid>
                  <Grid item>
                    <Chip label="New" sx={chipWarningSX} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ListItemWrapper>
          <Divider />
          <ListItemWrapper>
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: theme.palette.success.dark,
                    backgroundColor: theme.palette.success.light,
                    border: 'none',
                    borderColor: theme.palette.success.main
                  }}
                >
                  <IconBuildingStore stroke={1.5} size="1.3rem" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Store Verification Done</Typography>} />
              <ListItemSecondaryAction>
                <Grid container justifyContent="flex-end">
                  <Grid item xs={12}>
                    <Typography variant="caption" display="block" gutterBottom>
                      2 min ago
                    </Typography>
                  </Grid>
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
            <Grid container direction="column" className="list-container">
              <Grid item xs={12} sx={{ pb: 2 }}>
                <Typography variant="subtitle2">We have successfully received your request.</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item>
                    <Chip label="Unread" sx={chipErrorSX} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ListItemWrapper>
          <Divider />
          <ListItemWrapper>
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: theme.palette.primary.dark,
                    backgroundColor: theme.palette.primary.light,
                    border: 'none',
                    borderColor: theme.palette.primary.main
                  }}
                >
                  <IconMailbox stroke={1.5} size="1.3rem" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Check Your Mail.</Typography>} />
              <ListItemSecondaryAction>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Typography variant="caption" display="block" gutterBottom>
                      2 min ago
                    </Typography>
                  </Grid>
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
            <Grid container direction="column" className="list-container">
              <Grid item xs={12} sx={{ pb: 2 }}>
                <Typography variant="subtitle2">All done! Now check your inbox as you&apos;re in for a sweet treat!</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item>
                    <Button variant="contained" disableElevation endIcon={<IconBrandTelegram stroke={1.5} size="1.3rem" />}>
                      Mail
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ListItemWrapper>
          <Divider />
          <ListItemWrapper>
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Avatar alt="John Doe" src={User1} />
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">John Doe</Typography>} />
              <ListItemSecondaryAction>
                <Grid container justifyContent="flex-end">
                  <Grid item xs={12}>
                    <Typography variant="caption" display="block" gutterBottom>
                      2 min ago
                    </Typography>
                  </Grid>
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
            <Grid container direction="column" className="list-container">
              <Grid item xs={12} sx={{ pb: 2 }}>
                <Typography component="span" variant="subtitle2">
                  Uploaded two file on &nbsp;
                  <Typography component="span" variant="h6">
                    21 Jan 2020
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <Card
                      sx={{
                        backgroundColor: theme.palette.secondary.light
                      }}
                    >
                      <CardContent>
                        <Grid container direction="column">
                          <Grid item xs={12}>
                            <Stack direction="row" spacing={2}>
                              <IconPhoto stroke={1.5} size="1.3rem" />
                              <Typography variant="subtitle1">demo.jpg</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ListItemWrapper>
          <Divider />
          <ListItemWrapper>
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Avatar alt="John Doe" src={User1} />
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">John Doe</Typography>} />
              <ListItemSecondaryAction>
                <Grid container justifyContent="flex-end">
                  <Grid item xs={12}>
                    <Typography variant="caption" display="block" gutterBottom>
                      2 min ago
                    </Typography>
                  </Grid>
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
            <Grid container direction="column" className="list-container">
              <Grid item xs={12} sx={{ pb: 2 }}>
                <Typography variant="subtitle2">It is a long established fact that a reader will be distracted</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item>
                    <Chip label="Confirmation of Account." sx={chipSuccessSX} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ListItemWrapper>
        </>
      )}
    </List>
  );
};

export default NotificationList;
