import React, { useState, useEffect } from "react";
import { FiDownload, FiGithub } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const WorkCard = ({ w, tabId }) => {
	const siteLink = w.site;
	const imageArray = Array.isArray(w.imageUrl) && w.imageUrl.length > 0 ? w.imageUrl : [];
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		if (imageArray.length > 1) {
			const intervalId = setInterval(() => {
				setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
			}, 3000);
			return () => clearInterval(intervalId);
		}
	}, [imageArray]);

	const primaryLink = tabId === "react-native" ? w.app : siteLink;

	return (
		<div className='works-card' style={{ position: "relative", overflow: "hidden", border: "2px solid #ccc" }}>
			{/* Animated background */}
			<AnimatePresence mode="wait">
				{imageArray.length > 0 && (
					<motion.div
						key={imageArray[currentImageIndex]}
						className="works-card-bg"
						initial={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
						animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
						exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
						transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
						style={{
							backgroundImage: `url(${imageArray[currentImageIndex]})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							position: "absolute",
							inset: 0,
							zIndex: 0,
							borderRadius: "5px"
						}}
					/>
				)}
			</AnimatePresence>
			{/* Content */}
			<div className='works-container' style={{ position: "relative", zIndex: 1 }}>
				<a 
					href={primaryLink || "#"}
					{...(tabId === "react-native" && w.app ? { download: w.title } : {})}
					target='_blank' 
					rel='noopener noreferrer'
					className='work-content-link'
				>
					<div className='mid-work'>
						<p className='work-title'>{w.title}</p>
						<p className='work-desc'>{w.desc}</p>
					</div>
					<div className='bottom-work'>
						{w.tech.map((e, index) => (
							<small key={index}>{e}</small>
						))}
					</div>
				</a>
			</div>
		</div>
	);
};

export default WorkCard;
