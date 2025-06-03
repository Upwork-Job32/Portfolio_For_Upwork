import React from 'react';
import "../styles/About.css"
import { motion } from "framer-motion";
import ProfileImg from '../images/profile_me.jpg'

const About = () => {  
  
  const horizontal ={
    x:0, 
    opacity: 1, 
    transition:{type: 'spring', duration: 2,bounce: 0.3}
  }

  return (
      <>
          <div  className="about" id='about'>
              <div className="container">
                  <motion.div initial={{x: '-100%', opacity: 0}} whileInView={horizontal} viewport={{ once: true }} className="heading">
                    <p className="heading-sub-text">Who I am</p>
                    <p className='heading-text'>About Me</p>
                  </motion.div>
                  <div className="split-about">
                    <motion.div initial={{x: '-100%', opacity: 0}} whileInView={horizontal} className="about-content">
                        <p>I am Renan, a Senior Fullstack Developer with extensive experience in architecting and delivering scalable, high-performance web applications. My expertise centers on leveraging advanced AI technologies—particularly OpenAI frameworks—and developing secure, robust blockchain solutions. Proficient in both frontend and backend development, I excel at crafting seamless, end-to-end applications that balance innovation with reliability.</p>
                        <br />
                        <p>Driven by a commitment to solving complex problems, I specialize in integrating AI and blockchain to create transformative, user-focused solutions. Whether developing sophisticated AI-powered systems or designing decentralized architectures, I consistently deliver technically rigorous products that meet strategic business objectives.</p>
                    </motion.div>
                    <motion.div initial={{x: '50', opacity: 0}} whileInView={horizontal}  className='about-img'>
                        <img src={ProfileImg} alt="Profile" />
                    </motion.div>
                  </div>
              </div>
          </div>
      </>
  )
};

export default About;
