import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import {  textVariant } from "../utils/motion";
import { motion } from "framer-motion";

const Tech = () => {
  return (
    <>
    <motion.div variants={textVariant()} className="mb-5">
    <h2 className={styles.sectionHeadText}>Technologies</h2>
  </motion.div>
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='w-28 h-28' key={technology.name}>
          <BallCanvas icon={technology.icon} />
          <span className="ml-2">{technology.name}</span>
        </div>
      ))}
    </div>
    </>
  );
};

export default SectionWrapper(Tech, "");