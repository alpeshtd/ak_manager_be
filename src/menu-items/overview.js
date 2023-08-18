// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconChecklist, IconListDetails, IconShoppingCartPlus, IconCurrencyRupee } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconChecklist,
  IconListDetails,
  IconShoppingCartPlus,
  IconCurrencyRupee
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const overview = {
  id: 'overview',
  title: 'Overview',
  type: 'group',
  children: [
    {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      icon: icons.IconChecklist,
      url: '/overview/orders',
      breadcrumbs: false
    },
    {
      id: 'utilizations',
      title: 'Utilizations',
      type: 'item',
      icon: icons.IconListDetails,
      url: '/overview/utilizations',
      breadcrumbs: false
    },
    {
      id: 'purchases',
      title: 'Purchases',
      type: 'item',
      icon: icons.IconShoppingCartPlus,
      url: '/overview/purchases',
      breadcrumbs: false
    },
    {
      id: 'income',
      title: 'Income',
      type: 'item',
      icon: icons.IconCurrencyRupee,
      url: '/overview/incomes',
      breadcrumbs: false
    }
  ]
};

export default overview;
