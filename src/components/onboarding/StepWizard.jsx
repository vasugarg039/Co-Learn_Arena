import React from 'react';
import { motion } from 'framer-motion';

const StepWizard = ({ step, children }) => (
    <motion.div
        key={step}
        initial={{ x: 30, opacity: 0, filter: 'blur(10px)' }}
        animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
        exit={{ x: -30, opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: 0.6, type: "spring", damping: 20 }}
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
        {children}
    </motion.div>
);

export default StepWizard;
