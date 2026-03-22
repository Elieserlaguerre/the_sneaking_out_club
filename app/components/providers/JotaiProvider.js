import { Provider } from "jotai";
import React from "react";

export default function JotaiProvider({ children }) {
	return <Provider>{children}</Provider>;
}
