import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

// routes
import MainRoutes from './MainRoutes';
import { useEffect } from 'react';
import { useState } from 'react';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const auth = useSelector((state) => state.auth);
const [routes, setRoutes] = useState([])
  useEffect(() => {
    const allowedIds=auth.pages;
  setRoutes({
    path: MainRoutes.path,
    children: MainRoutes.children.filter(route => {
        // If the route is not protected or its id is in the allowedIds array, keep it
        return !route.protected || allowedIds.includes(route.id);
    })
})
  }, [ ])
  
  
  return useRoutes([routes]);

}
