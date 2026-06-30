import GroupPage from "@/app/components/global-components/GroupPage";

export const metadata = {
	title: "The Sneaking Out Club",
	description: "Family Management Platform"
};

function layout({ children }) {
	return <GroupPage>{children}</GroupPage>;
}

export default layout;
