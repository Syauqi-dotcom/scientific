import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Portfolio from './Portfolio';
import PublicationsPage from './pages/PublicationsPage';
import ProjectsPage from './pages/ProjectsPage';

const App = () => (
    <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
    </Routes>
);

export default App;
