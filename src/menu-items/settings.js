// assets
import { IconAdjustments, IconUsers } from '@tabler/icons';

// constant
const icons = { IconAdjustments, IconUsers };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'Settings',
  title: 'Settings',
  type: 'group',
  children: [
    {
      id: 'Users',
      title: 'Users',
      type: 'item',
      url: '/dashboard/users',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'Roles',
      title: 'Roles',
      type: 'item',
      url: '/dashboard/roles',
      icon: icons.IconAdjustments,
      breadcrumbs: false
    },
 
    
    // {
    //   id: 'util-fee',
    //   title: 'Fee Structure',
    //   type: 'item',
    //   url: '/utils/util-color',
    //   icon: icons.IconReceipt,
    //   breadcrumbs: false
    // }
    // {
    //   id: 'util-shadow',
    //   title: 'Shadow',
    //   type: 'item',
    //   url: '/utils/util-shadow',
    //   icon: icons.IconShadow,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'icons',
    //   title: 'Icons',
    //   type: 'collapse',
    //   icon: icons.IconWindmill,
    //   children: [
    //     {
    //       id: 'tabler-icons',
    //       title: 'Tabler Icons',
    //       type: 'item',
    //       url: '/icons/tabler-icons',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'material-icons',
    //       title: 'Material Icons',
    //       type: 'item',
    //       external: true,
    //       target: '_blank',
    //       url: 'https://mui.com/material-ui/material-icons/',
    //       breadcrumbs: false
    //     }
    //   ]
    // }
  ]
};

export default other;
