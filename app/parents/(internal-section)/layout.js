import { Inter } from "next/font/google";
import "../../styles/global.css";
import ProvidersLayout from "@/app/components/layouts/ProvidersLayout";
import InternalLayout from "@/app/components/layouts/InternalLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "The Sneaking Out Club",
	description: "Family management app"
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ProvidersLayout>
					<InternalLayout>{children}</InternalLayout>
				</ProvidersLayout>
			</body>
		</html>
	);
}
