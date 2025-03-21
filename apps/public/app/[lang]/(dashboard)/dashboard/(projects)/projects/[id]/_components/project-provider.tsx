"use client";

import React, {createContext, useContext} from "react";

interface ProjectProviderProps {
  children: React.ReactNode;
  isProjectEditable: boolean;
}

export const ProjectContext = createContext({isProjectEditable: false});

export const useProject = () => useContext(ProjectContext);

export function ProjectProvider({children, isProjectEditable}: ProjectProviderProps) {
  return <ProjectContext.Provider value={{isProjectEditable}}>{children}</ProjectContext.Provider>;
}
