// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconBuildingWarehouse, IconUsers, IconTruckDelivery, IconFriends, IconMasksTheater, IconUserCircle } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconBuildingWarehouse,
  IconUsers,
  IconTruckDelivery,
  IconFriends,
  IconMasksTheater,
  IconUserCircle
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const elements = {
  id: 'elements',
  title: 'Elements',
  type: 'group',
  children: [
    // {
    //   id: 'stock',
    //   title: 'Stock',
    //   type: 'item',
    //   icon: icons.IconBuildingWarehouse,
    //   url: '/elements/stock',
    //   breadcrumbs: false
    // },
    {
      id: 'customers',
      title: 'Customers',
      type: 'item',
      icon: icons.IconUsers,
      url: '/elements/customers',
      breadcrumbs: false
    },
    {
      id: 'vendors',
      title: 'Vendors',
      type: 'item',
      icon: icons.IconTruckDelivery,
      url: '/elements/vendors',
      breadcrumbs: false
    },
    // {
    //   id: 'employees',
    //   title: 'Employees',
    //   type: 'item',
    //   url: '/elements/employees',
    //   icon: icons.IconUserCircle,
    //   breadcrumbs: false
    // },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      icon: icons.IconFriends,
      url: '/elements/users',
      breadcrumbs: false,
      restricted: true,
    },
    {
      id: 'userRole',
      title: 'User Role',
      type: 'item',
      url: '/elements/userRole',
      icon: icons.IconMasksTheater,
      breadcrumbs: false,
      restricted: true,
    }
  ]
};

export default elements;
