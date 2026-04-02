import { Inter } from "next/font/google";
import "../styles/global.css";
import ProvidersLayout from "../components/layouts/ProvidersLayout";
import ExternalLayout from "../components/layouts/ExternalLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "The Sneaking Out Club",
	description: "Family management app"
};

export default function RootLayout({ children }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	return (
		<html lang="en" className={classNames(inter.className, "h-full antialiased")} suppressHydrationWarning>
			<body className="min-h-full flex flex-col">
				<ProvidersLayout>
					<ExternalLayout>{children}</ExternalLayout>
				</ProvidersLayout>
			</body>
		</html>
	);
}
