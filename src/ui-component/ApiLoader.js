import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState } from 'react';
import { useEffect } from 'react';

const ApiLoader = (props) => {
  const { showLoading, apiStatus, setShowLoading } = props;
  const [apiDoneContent, setApiDoneContent] = useState();

  useEffect(() => {
    if (apiStatus == 'success') {
      setApiDoneContent(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 50 }} />
          <div>Success!</div>
        </div>
      );
      setTimeout(() => {
        setShowLoading(false);
      }, 0);
    } else if (apiStatus == 'failed') {
      setApiDoneContent(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <HighlightOffIcon sx={{ fontSize: 50, color: 'salmon' }} />
          <div>Failed!</div>
        </div>
      );
      setTimeout(() => {
        setShowLoading(false);
      }, 0);
    }
  }, [apiStatus]);

  return (
    <Dialog open={showLoading}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 200, minHeight: 100 }}>
        {apiDoneContent || <CircularProgress />}
      </Box>
    </Dialog>
  );
};

export default ApiLoader;
