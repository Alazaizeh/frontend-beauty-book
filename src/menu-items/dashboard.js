// assets
import { IconLayoutDashboard } from '@tabler/icons';

// constant
const icons = { IconLayoutDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'Dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'Dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.IconLayoutDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
