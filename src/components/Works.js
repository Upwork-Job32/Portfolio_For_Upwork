import React, { useState } from "react";
import "../styles/Works.css";
import { motion } from "framer-motion";
import { AllWorksData } from "../data/WorkData";
import WorkCard from "./WorkCard";
import {
	FaBrain,
	FaLaptopCode,
	FaReact,
	FaMobileAlt,
	FaWordpressSimple,
	FaShopify,
	FaGamepad,
	FaMapMarkedAlt,
	FaCubes
} from "react-icons/fa";
import { SiEthereum } from "react-icons/si";

const workAnimations = {
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
	tabsContainer: {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.2, 
			},
		},
	},
	tabItem: {
		hidden: { opacity: 0, y: 20, scale: 0.9 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: { type: "spring", stiffness: 120, damping: 12, duration: 0.5 },
		},
	},
	workCardFade: {
		opacity: 1,
		transition: {
			duration: 1.4,
		},
	},
};

const Works = () => {
	const [activeTab, setActiveTab] = useState("openai");

	const tabData = [
		{ id: "openai", label: "AI & OpenAI", shortLabel: "AI/OpenAI", icon: <FaBrain />, data: AllWorksData.openai || [] },
		{ id: "blockchain", label: "Blockchain & Web3", shortLabel: "Blockchain", icon: <SiEthereum />, data: AllWorksData.blockchain || [] },
		{ 
			id: "fullstack", 
			label: "Fullstack Web", 
			shortLabel: "Fullstack", 
			icon: <FaLaptopCode />, 
			data: [
				...(AllWorksData.react || []),
				...(AllWorksData.vue || []),
				...(AllWorksData.angular || []),
				...(AllWorksData.javascript || [])
			]
		},
		{ id: "threedui", label: "Interactive 3D & UI", shortLabel: "3D & UI", icon: <FaReact />, data: AllWorksData.threedui || [] },
		{ id: "wordpress", label: "WordPress CMS", shortLabel: "WordPress", icon: <FaWordpressSimple />, data: AllWorksData.wordpress || [] },
		{ id: "shopify", label: "Shopify Stores", shortLabel: "Shopify", icon: <FaShopify />, data: AllWorksData.shopify || [] },
	];

	const availableTabs = tabData.filter(tab => tab.data && tab.data.length > 0);
	
	if (availableTabs.length > 0 && !availableTabs.find(tab => tab.id === activeTab)) {
		setActiveTab(availableTabs[0].id);
	}

	return (
		<div className='works' id='works'>
			<div className='container'>
				<motion.div
					variants={workAnimations.heading}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.3 }}
					className='heading'>
					<p className='heading-sub-text'>I build real value</p>
					<p className='heading-text'>Works</p>
				</motion.div>

				<motion.div
					className='works-filter-tabs-container'
					variants={workAnimations.tabsContainer}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.2 }}
				>
					{availableTabs.map((tab) => (
						<motion.button
							key={tab.id}
							className={`works-filter-tab ${activeTab === tab.id ? "active" : ""}`}
							onClick={() => setActiveTab(tab.id)}
							variants={workAnimations.tabItem}
							whileHover={{ scale: 1.05, y: -2 }}
							whileTap={{ scale: 0.95 }}
						>
							{tab.icon}
							<span>{tab.shortLabel}</span>
						</motion.button>
					))}
				</motion.div>

				<motion.div
					className='works-box'
					key={activeTab}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
				>
					{availableTabs.map(
						(tab) =>
							activeTab === tab.id && (
								<React.Fragment key={tab.id}>
									{tab.data.map((w, index) => (
										<WorkCard w={w} tabId={tab.id} key={`${tab.id}-${index}-${w.title}`} />
									))}
								</React.Fragment>
							)
					)}
				</motion.div>
			</div>
		</div>
	);
};

export default Works;
