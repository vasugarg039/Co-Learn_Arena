import React, { createContext, useContext, useState } from 'react';

const ExamModeContext = createContext();

export const useExamMode = () => useContext(ExamModeContext);

export const ExamModeProvider = ({ children }) => {
    const [examMode, setExamMode] = useState(false);

    const toggleExamMode = () => setExamMode(prev => !prev);

    return (
        <ExamModeContext.Provider value={{ examMode, toggleExamMode }}>
            {children}
        </ExamModeContext.Provider>
    );
};
