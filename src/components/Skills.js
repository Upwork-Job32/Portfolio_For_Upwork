import React, { useState } from "react";
import "../styles/Skills.css";
import { motion, AnimatePresence } from "framer-motion";
import { SkillsData } from "../data/SkillsData";
import {
	FaLaptopCode,
	FaBrain,
	FaReact,
	FaTasks,
	FaFigma
} from "react-icons/fa";
import {
	SiEthereum,
	SiNodedotjs,
	SiDocker,
} from "react-icons/si";

// Animation variants defined outside component for better performance and reusability
const animations = {
	container: {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.1,
				when: "beforeChildren"
			},
		},
		exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
	},
	
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

	skillCard: {
		hidden: { 
			opacity: 0,
			y: 50,
			scale: 0.5,
		},
		visible: { 
			opacity: 1,
			y: 0,
			scale: 1,
			rotate: 0,
			transition: {
				type: "spring",
				stiffness: 150,
				damping: 15,
				duration: 0.8
			}
		},
		hover: {
			scale: 1.05,
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 10,
				duration: 0.2
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
};

const Skills = () => {
	// Get category keys and set the first one as default active tab
	const categoryKeys = Object.keys(SkillsData);
	const [activeSkillTab, setActiveSkillTab] = useState(categoryKeys[0]);

	// Mapping old titles to new shorter labels
	const tabLabelMap = {
		"Core Technologies": "Core Tech",
		"AI Development (OpenAI)": "AI/OpenAI",
		"Blockchain Development": "Blockchain",
		"Frontend Development": "Frontend",
		"Backend Development": "Backend",
		"DevOps & Infrastructure": "DevOps",
		"UI/UX Design": "UI/UX",
		"Project Management & Agile": "Agile PM"
	};

	// Corrected categoryIconMap using keys from SkillsData
	const categoryIconMap = {
		fundamentals: <FaLaptopCode />,
		aiDevelopment: <FaBrain />,
		blockchain: <SiEthereum />,
		frontend: <FaReact />,
		backendDevelopment: <SiNodedotjs />,
		devops: <SiDocker />,
		design: <FaFigma />, // Key for UI/UX Design in SkillsData is 'design'
		projectManagement: <FaTasks />, // Key for Project Management & Agile in SkillsData is 'projectManagement'
	};

	const skillTabButtonsData = categoryKeys.map(key => ({
		id: key,
		label: tabLabelMap[SkillsData[key].title] || SkillsData[key].title,
		icon: categoryIconMap[key] || <FaLaptopCode />
	}));

	const activeCategoryData = SkillsData[activeSkillTab];

	return (
		<section className='skills' id='skills'>
			<div className='container'>
				<motion.div
					className='heading'
					variants={animations.heading}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.3 }}
				>
					<motion.p 
						className='heading-sub-text'
						whileHover={{ scale: 1.05 }}
					>
						What I work with
					</motion.p>
					<motion.p 
						className='heading-text'
						whileHover={{ scale: 1.05 }}
					>
						My Skills
					</motion.p>
				</motion.div>

				{/* Skill Category Tabs */}
				<motion.div
					className='skill-tabs-container'
					variants={animations.tabsContainer}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.2 }}
				>
					{skillTabButtonsData.map((tab) => (
						<motion.button
							key={tab.id}
							className={`skill-tab ${activeSkillTab === tab.id ? "active" : ""}`}
							onClick={() => setActiveSkillTab(tab.id)}
							variants={animations.tabItem}
							whileHover={{ scale: 1.05, y: -2 }}
							whileTap={{ scale: 0.95 }}
						>
							{tab.icon}
							<span>{tab.label}</span>
						</motion.button>
					))}
				</motion.div>

				<AnimatePresence mode="wait">
					{activeCategoryData && (
						<motion.div
							key={activeSkillTab}
							className='skills-box'
							variants={animations.container}
							initial="hidden"
							animate="visible"
							exit="exit"
						>
							<div className="category-skills">
								{activeCategoryData.skills.map((skill, skillIndex) => (
									<motion.div 
										className='skill-card' 
										key={`${activeSkillTab}-${skill.name}-${skillIndex}`}
										variants={animations.skillCard}
										whileHover="hover"
										whileTap={{ scale: 0.95 }}
									>
										<motion.div 
											className='skill-icon'
										>
											{skill.icon}
										</motion.div>
										<motion.small className='skill-desc'>
											{skill.name}
										</motion.small>
										<motion.small className='skill-proficiency'>
											{skill.proficiency}
										</motion.small>
									</motion.div>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	);
};

export default Skills;
