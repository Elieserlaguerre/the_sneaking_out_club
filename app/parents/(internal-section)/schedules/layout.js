import SectionLayout from "@/app/components/layouts/SectionLayout";

export const metadata = {
	title: "The Sneaking Out Club",
	description: "Club Management App"
};

function layout({ children }) {
	return <SectionLayout>{children}</SectionLayout>;
}

export default layout;
