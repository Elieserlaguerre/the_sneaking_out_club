import RegistrationLayout from "@/app/components/layouts/RegistrationLayout";

export const metadata = {
	title: "The Sneaking Out Club",
	description: "Family Management App"
};

function layout({ children }) {
	return <RegistrationLayout>{children}</RegistrationLayout>;
}

export default layout;
