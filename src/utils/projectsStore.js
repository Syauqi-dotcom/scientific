// Utility for loading projects from local content folder (managed by Decap CMS)
const projectModules = import.meta.glob('../content/projects/*.json', { eager: true });
const projectsList = Object.values(projectModules)
    .map((mod, idx) => {
        const data = mod.default || mod;
        return {
            ...data,
            id: data.id || `proj-${idx}-${data.title.replace(/\s+/g, '-').toLowerCase()}`,
            selected: data.selected !== undefined ? data.selected : true
        };
    })
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));

export const getStoredProjects = () => {
    return projectsList;
};

export const saveProjects = () => {};
export const resetProjects = () => projectsList;
