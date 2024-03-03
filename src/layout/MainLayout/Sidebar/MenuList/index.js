// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import getMenuItems from 'menu-items';
import { useEffect ,useState} from 'react';
import { useSelector } from 'react-redux';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const [menuItem, setMenuItems] = useState({items:[]})
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    setMenuItems(getMenuItems())
  }, [isAuthenticated])
  


  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error !
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
