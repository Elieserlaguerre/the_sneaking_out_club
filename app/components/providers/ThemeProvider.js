"use client";

import { dynamicLayoutThemeColor } from "@/app/lib/util/frontend-helper-functions";
import React from "react";
import { createContext, useContext, useMemo } from "react";

// create context
const ThemeContext = createContext(null);

export function ThemeProvider({ children, department }) {
	const theme = useMemo(() => {
		if (!department) return null;
		return dynamicLayoutThemeColor(department);
	}, [department]);

	return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

// hook (we'll export later)
export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
