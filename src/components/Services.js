import React from 'react';
import "../styles/Services.css"
import {IoColorWandOutline} from "react-icons/io5"
import {BiCodeAlt} from "react-icons/bi"
import { FaBrain, FaPaintBrush, FaCogs } from "react-icons/fa";
import { motion } from "framer-motion";

// Define a specific heading animation variant for Services section
const servicesAnimations = {
    heading: {
        hidden: {
            y: -50,
            opacity: 0,
            scale: 0.9,
            rotateX: -30 
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0, 
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.8,
                delay: 0.1 
            }
        }
    },
    serviceCardBox: { // Renamed from contentFade for clarity and to handle stagger
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3, duration: 0.5 }
        }
    },
    serviceCardItem: { // New variant for individual card animation
        hidden: { opacity: 0, y: 50, scale: 0.8, rotateX: -20 },
        visible: {
            opacity: 1, y: 0, scale: 1, rotateX: 0,
            transition: { type: "spring", stiffness: 120, damping: 12 }
        },
        hover: { // Added hover state for 3D effect
            scale: 1.05,
            rotateY: 10, // Subtle rotation, adjust as desired
            z: 20, // Lift effect
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)", // Enhanced shadow on hover
            transition: { type: "spring", stiffness: 200, damping: 15 }
        }
    }
};

// Service data (can be moved to a separate file later if it grows)
const serviceItemsData = [
    {
        icon: <FaBrain />,
        title: "AI & OpenAI Solutions",
        description: "Architecting and developing sophisticated AI-powered applications leveraging OpenAI APIs, Langchain, and advanced LLM fine-tuning. Specializing in creating custom chatbots, intelligent content generation systems, and in-depth data analysis solutions powered by vector databases to unlock actionable insights and drive automation."
    },
    {
        icon: <IoColorWandOutline />,
        title: "Blockchain Development",
        description: "Delivering end-to-end blockchain solutions, from secure smart contract development and auditing (Solidity, Rust) to deploying scalable DApps, custom DeFi platforms, and vibrant NFT marketplaces. Expertise in creating bespoke crypto tokens and integrating seamless, secure blockchain-based payment systems."
    },
    {
        icon: <BiCodeAlt />,
        title: "Fullstack Development",
        description: "Expert full-stack development of high-performance, scalable web applications. Crafting intuitive and dynamic frontends using modern frameworks (React, Next.js, Vue.js, Angular) and compelling 3D/UI/UX with Three.js. Engineering robust backends (Node.js, Python, PHP) with efficient database management (MongoDB, PostgreSQL, MySQL) and seamless API integration for comprehensive, end-to-end digital solutions."
    },
    // Add more services if needed, e.g.:
    // {
    //     icon: <FaPaintBrush />,
    //     title: "UI/UX Design",
    //     description: "Creating intuitive and visually appealing user interfaces and experiences that enhance user engagement and satisfaction."
    // },
    // {
    //     icon: <FaCogs />,
    //     title: "DevOps & System Architecture",
    //     description: "Designing robust system architectures and implementing CI/CD pipelines for efficient and reliable software delivery."
    // }
];

const Services = () => {

  return (
      <>
          <div className="services" id='services'>
              <div className="container">
                <motion.div 
                    // whileInView={fade} // Old animation
                    variants={servicesAnimations.heading} // Use new heading animation
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }} // Consistent with Skills.js viewport
                    className="heading"
                >
                    <p className="heading-sub-text">What I can do</p>
                    <p className='heading-text'>Services</p>
                </motion.div>
                <motion.div 
                    className="services-box" 
                    // whileInView={fade} // Old animation
                    variants={servicesAnimations.serviceCardBox} 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }} // Adjust amount if needed
                >
                    {serviceItemsData.map((service, index) => (
                        <motion.div 
                            className="services-card" 
                            key={index}
                            variants={servicesAnimations.serviceCardItem}
                            whileHover="hover" // Apply the defined hover animation
                            whileTap={{ scale: 0.98 }} // Subtle tap effect
                        >
                            <div className='services-icon'>{service.icon}</div> {/* Wrapped icon for better control if needed */}
                            <p className='services-title'>{service.title}</p>
                            <p className='services-desc'>{service.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
              </div>
          </div>
      </>
  )
};

export default Services;
