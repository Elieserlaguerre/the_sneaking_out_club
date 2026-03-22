import React, { Fragment } from "react";
import { Toaster } from "react-hot-toast";

export default function ToasterProvider({ children }) {
	return (
		<Fragment>
			<Toaster
				position="bottom-right"
				toastOptions={{
					success: {
						style: {
							background: "green",
							color: "white"
						},
						iconTheme: {
							primary: "white",
							secondary: "black"
						}
					},
					error: {
						style: {
							background: "red",
							color: "white"
						},
						iconTheme: {
							primary: "white",
							secondary: "black"
						}
					},
					duration: 8000
				}}
			/>
			{children}
		</Fragment>
	);
}
