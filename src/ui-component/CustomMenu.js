import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    }
  }
}));

export default function CustomizedMenus(props) {
  const { allowedActions, data, page, deleteClickHandler } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (type) => {
    setAnchorEl(null);
    if (type === 'delete') {
      deleteClickHandler(data.id);
    }
  };

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {(allowedActions.includes('edit') || allowedActions.includes('superUser')) && (
          <Link to={'../edit-new-data'} state={{ prevData: { ...data }, edit: true, slug: page }}>
            <MenuItem onClick={handleClose} disableRipple>
              <EditOutlinedIcon />
              Edit
            </MenuItem>
          </Link>
        )}
        {(allowedActions.includes('delete') || allowedActions.includes('superUser')) && (
          <MenuItem onClick={() => handleClose('delete')} disableRipple>
            <DeleteOutlinedIcon />
            Delete
          </MenuItem>
        )}
        {(allowedActions.includes('viewMore') || allowedActions.includes('superUser')) && (
          <MenuItem onClick={handleClose} disableRipple>
            <ArchiveIcon />
            View More
          </MenuItem>
        )}
      </StyledMenu>
    </div>
  );
}
