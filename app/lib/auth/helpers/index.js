import bcrypt from "bcryptjs";
import Admin from "../../models/Admin";
import Parent from "../../models/Parent";
import Member from "../../models/Member";
import Teacher from "../../models/Teacher";
import Applicant from "../../models/Applicant";
import db from "../../database";

export const encryptPassword = async (password) => {
	const saltRounds = 10;
	const hash = bcrypt.hashSync(password, saltRounds);
	return hash;
};

export const verifyPassword = async (credentials, req) => {
	try {
		await db.connect();

		const { email, password, select_account, department } = credentials;

		let user = null;
		let passwordMatch = false;

		switch (department) {
			case "members":
				user = await Member.findOne({ email, accountType: select_account });
				passwordMatch = user && (await bcrypt.compare(password, user.password));
				break;

			case "parents":
				user = await Parent.findOne({ email });
				passwordMatch = user && (await bcrypt.compare(password, user.password));
				break;

			case "teachers":
				user = await Teacher.findOne({ email });
				passwordMatch = user && (await bcrypt.compare(password, user.password));
				break;

			case "admin":
				user = await Admin.findOne({ email });
				passwordMatch = user && (await bcrypt.compare(password, user.password));
				break;

			case "careers":
				user = await Applicant.findOne({ email });
				passwordMatch = user && (await bcrypt.compare(password, user.password));
				break;

			default:
				throw new Error("Document model is not recognized.");
		}

		if (!passwordMatch || !user) {
			return { verified: false, user: null };
		}

		// ✅ Return plain object
		const plainUser = {
			_id: user?._id?.toString(),
			name: `${user?.firstName} ${user?.lastName}`,
			email: user.email,
			image: user?.image ?? "",
			cloudinarySubfolder: user?.cloudinarySubfolder ?? "",
			status: user?.status || null,
			department: department
		};

		return { verified: true, user: plainUser };
	} catch (error) {
		console.log("verifyPassword error:", error.message);
		return { verified: false };
	}
};
