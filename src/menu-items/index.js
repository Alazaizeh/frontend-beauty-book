import Dashboard from "./dashboard";
// import pages from './pages';
import Settings from "./settings";
import { IconUserExclamation,IconUserPlus,IconUsers,IconCalendarTime ,IconAlignBoxRightTop,IconBuildingStore} from "@tabler/icons";

import { hasPageAccess } from "authorization/permissions";

// ==============================|| MENU ITEMS ||============================== //
const menuItems = {
  items: [
    {
      id: "Accounts",
      title: "Accounts",
      type: "group",
      children: [
        {
          id: "Users",
          title: "Users",
          type: "item",
          url: "/dashboard/users",
          icon: IconUsers,
          breadcrumbs: false,
        },
        {
          id: "Roles",
          title: "Roles",
          type: "item",
          url: "/dashboard/roles",
          icon: IconUserPlus,
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "Business",
      title: "Business",
      type: "group",
      children: [
        {
          id: "Salons",
          title: "Salons",
          type: "item",
          url: "/dashboard/salons",
          icon: IconBuildingStore,
          breadcrumbs: false,
        },
        {
          id: "Staff",
          title: "Staff",
          type: "item",
          url: "/dashboard/staff",
          icon: IconUserExclamation,
          breadcrumbs: false,
        },
        {
          id: "Services",
          title: "Services",
          type: "item",
          url: "/dashboard/services",
          icon: IconAlignBoxRightTop,
          breadcrumbs: false,
        },
        {
          id: "Appointments",
          title: "Appointments",
          type: "item",
          url: "/dashboard/appointments",
          icon: IconCalendarTime,
          breadcrumbs: false,
        },
      ],
    },
  ],
};

const filterMenuItems = () => {
  
  const filteredItems = menuItems.items.filter((group) => {
    return true;
    if (group.children) {
      group.children = group.children.filter((item) => hasPageAccess(item.id));
      return group.children.length > 0;
    }
    return false;
  });

  return {
    items: filteredItems,
  };
};

export default filterMenuItems;
