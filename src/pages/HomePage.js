import React, { useState, useCallback } from 'react';
import Main from '../components/Main';
import Navbar from '../components/navbar/Navbar';

const HomePage = () => {
  console.log("HomePage.js rendering");
  // States
  const [nav, setNav] = useState(false)

  const handleNav = useCallback(() => {
    setNav(prevNav => !prevNav)
  }, [])

  const closeNav = useCallback(() => {
    setNav(currentNavState => {
      if (currentNavState) {
        return false;
      }
      return currentNavState;
    })
  }, [])

  return(
    <div  className='pages'>
        <Navbar nav={nav} handleNav={handleNav} />
        <Main nav={nav} closeNav={closeNav} handleNav={handleNav} />
    </div>
  ) 
};

export default HomePage;
