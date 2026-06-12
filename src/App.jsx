import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Portfolio from './Portfolio';
import PublicationsPage from './pages/PublicationsPage';
import ProjectsPage from './pages/ProjectsPage';

const App = () => {
    const [bgAnimationDisabled, setBgAnimationDisabled] = useState(() => {
        return localStorage.getItem('bgAnimationDisabled') === 'true';
    });

    const toggleBgAnimation = () => {
        setBgAnimationDisabled(prev => {
            const newVal = !prev;
            localStorage.setItem('bgAnimationDisabled', String(newVal));
            return newVal;
        });
    };

    return (
        <Routes>
            <Route path="/" element={<Portfolio bgAnimationDisabled={bgAnimationDisabled} toggleBgAnimation={toggleBgAnimation} />} />
            <Route path="/publications" element={<PublicationsPage bgAnimationDisabled={bgAnimationDisabled} toggleBgAnimation={toggleBgAnimation} />} />
            <Route path="/projects" element={<ProjectsPage bgAnimationDisabled={bgAnimationDisabled} toggleBgAnimation={toggleBgAnimation} />} />
        </Routes>
    );
};

export default App;
