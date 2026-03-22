import { Inter } from "next/font/google";
import "../../styles/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "The Sneaking Out Club",
	description: "Family management app"
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
