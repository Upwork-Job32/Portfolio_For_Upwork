import React from "react";
// Removed motion and Link as they don't seem to be used in this simplified context for Main
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
import ThreeBackground from "./ThreeBackground";
import About from './About';
import HeroSection from './HeroSection';
import Skills from './Skills';
import Services from './Services';
import Works from './Works';

// Wrap Main with React.memo
const Main = React.memo(({ nav, handleNav, closeNav }) => {
	console.log("Main.js rendering"); // ADD THIS LINE
	return (
		<div onClick={closeNav} className='main' style={{ position: 'relative', overflow: 'hidden' }}>
			
			<div style={{ position: 'relative', zIndex: 1 }}>
			{/* <ThreeBackground /> */}
				<HeroSection nav={nav} handleNav={handleNav} />
				<About />
				<Skills />
				<Services />
				<Works />
			</div>
		</div>
	);
});

Main.displayName = 'Main'; // Optional: for better debugging names

export default Main;
