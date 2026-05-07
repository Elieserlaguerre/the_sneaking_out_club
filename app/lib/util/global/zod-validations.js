import z from "zod";

export const registrationFormSchema = z
	.object({
		firstName: z.string().trim().min(1, { message: "first name is required." }),
		lastName: z.string().trim().min(1, { message: "last name is required." }),
		email: z.email({ message: "please provide a valid email." }),
		phone: z.string().trim().nonempty({ message: "phone number is required." }),
		password: z.string().trim().min(1, { message: "password is required." }),
		confirmPassword: z.string().trim().min(1, { message: "password must be confirmed." }),
		address1: z.string().trim().min(1, { message: "address is required." }),
		address2: z.string().optional(),
		accountType: z.any().refine((value) => value !== "select one", { message: "account type is required." }),
		city: z.string().trim().min(1, { message: "city is required." }),
		state: z.string().trim().min(1, { message: "state is required." }),
		zipCode: z.string().trim().nonempty({ message: "zip code/region is required." }),
		country: z.string().trim().nonempty({ message: "Country is required." })
	})
	.refine((data) => data.password === data.confirmPassword, { message: "password must match.", path: ["confirmPassword"] });

export const cloudinarySingleUploadSchema = z.object({
	image: z.custom((value) => value instanceof File, {
		message: "Please upload a valid image file."
	}),
	cloudinarySubfolder: z.string().trim().nonempty({ message: "Cloudinary subfolder is required." })
});

export const additionalInfoSchema = z.object({
	dateOfBirth: z
		.string()
		.nonempty({ message: "date of birth is required." })
		.transform((date) => new Date(date))
		.pipe(z.date()),
	age: z
		.union([z.string(), z.number()])
		.transform((value) => {
			const num = Number(value);
			return isNaN(num) ? undefined : num;
		})
		.pipe(
			z
				.number({
					required_error: "age is required.",
					invalid_type_error: "age must be a number"
				})
				.min(18, { message: "minors cannot join this platform." })
				.max(100, { message: "you've exceeded the age limit for this platform" })
		),
	nationality: z.string().min(1, { message: "nationality is required." }),
	gender: z.enum(["Male", "Female", "Other"]),
	introduction: z.string().min(1, { message: "introduction is required." }),
	image: z.object({
		publicId: z.string().trim().nonempty({ message: "Image's public Id is required." }),
		url: z.string().trim().nonempty({ message: "uploaded image file url is required." })
	}),
	cloudinarySubfolder: z.string().trim().nonempty({ message: "Cloudinary subfolder is required." })
});

export const loginSchema = z.object({
	email: z.string().trim().nonempty({ message: "email is required." }),
	password: z.string().trim().nonempty({ message: "password is required." }),
	department: z.string().trim().nonempty({ message: "department is required." })
});

export const contactUsSchema = z.object({
	firstName: z.string().trim().nonempty({ message: "First name is required." }),
	lastName: z.string().trim().nonempty({ message: "Last name is required." }),
	email: z.string().trim().nonempty({ message: "email is required." }),
	phone: z.string().trim().nonempty({ message: "phone number is required." }),
	subject: z.string().trim().nonempty({ message: "subject is required." }),
	message: z.string().trim().nonempty({ message: "message is required." })
});

/*
==============
SHARE FIELDS
==============
*/
const baseSchema = z.object({
	firstName: z.string().trim().nonempty({ message: "first name is required." }),
	lastName: z.string().trim().nonempty({ message: "last name is required." }),
	memberType: z.enum(["ancestor", "root family member", "household member", "platform user"]),
	familyTree: z.string().trim().nonempty({ message: "family tree is required." }),
	nationality: z.string().trim().nonempty({ message: "nationality is required." }),
	relation: z.string().trim().nonempty({ message: "relation is required." }),
	gender: z.enum(["male", "female"]),
	creator: z.string().trim().nonempty({ message: "document creator is required." }),

	//keep address information optional for non-platform users.
	address1: z.string().trim().optional(),
	address2: z.string().trim().optional(),
	city: z.string().trim().optional(),
	state: z.string().trim().optional(),
	zipCode: z.string().trim().optional(),
	country: z.string().trim().optional(),

	// keep platform user fields optional in base
	email: z.string().trim().optional(),
	phone: z.string().trim().optional(),
	password: z.string().trim().optional(),
	confirmPassword: z.string().trim().optional(),
	introduction: z.string().trim().optional(),

	// keep your existing image logic
	image: z.any().optional()
});

/*
===================
FIRST UNIQUE FIELDS
===================
*/

const platformUserSchema = baseSchema
	.extend({
		memberType: z.literal("platform user"),
		email: z.email(),
		phone: z.string().trim().nonempty({ message: "phone  is required." }),
		password: z.string().trim().nonempty({ message: "password is required." }),
		confirmPassword: z.string().trim().nonempty({ message: "password confirmation is required." }),
		address1: z.string().trim().nonempty({ message: "address 1 is required." }),
		address2: z.string().trim().nonempty({ message: "address 2 is required." }),
		city: z.string().trim().nonempty({ message: "city is required." }),
		state: z.string().trim().nonempty({ message: "state is required." }),
		zipCode: z.string().trim().nonempty({ message: "zip code is required." }),
		country: z.string().trim().nonempty({ message: "country is required." }),
		introduction: z.string().trim().nonempty({ message: "Introduction is required." }),
		family: z.string().trim().nonempty({ message: "family required." }),
		// keep your existing image logic
		image: z
			.any()
			.refine((val) => typeof val === "object" && val !== null, {
				message: "Please upload a valid image"
			})
			.superRefine((val, ctx) => {
				if (typeof val !== "object" || val === null) return;

				if (!val.publicId || val.publicId.trim() === "") {
					ctx.addIssue({
						path: ["publicId"],
						code: "custom",
						message: "Image's public Id is required."
					});
				}

				if (!val.url || val.url.trim() === "") {
					ctx.addIssue({
						path: ["url"],
						code: "custom",
						message: "uploaded image file url is required."
					});
				}
			})
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "passwords must match"
	});

/*
	====================
	SECOND UNIQUE FIELDS
	====================
	*/

const nonPlatformUserSchema = baseSchema.extend({
	memberType: z.enum(["ancestor", "root family member", "household member"]).refine((val) => val !== "select one", { message: "member type is required." }),
	email: z.string().optional(),
	phone: z.string().optional(),
	password: z.string().optional(),
	confirmPassword: z.string().optional(),
	introduction: z.string().optional(),
	dateOfBirth: z.string().optional(),
	age: z.union([z.string().optional(), z.number().optional()]),
	nationality: z.string().optional()
});

/*
==============================
FIELD COMPILATION & FILTRATION
==============================
*/
export const manageFamilyMemberSchema = z.discriminatedUnion("memberType", [platformUserSchema, nonPlatformUserSchema]);

export const eventSchema = z
	.object({
		ledgerEntry: z.object({
			create: z.coerce.boolean(),
			event: z.string().trim().nonempty({ message: "event type is required." }),
			type: z
				.string()
				.trim()
				.nonempty({ message: "ledger entry type is required." })
				.pipe(z.enum(["single", "double"])),
			updateSnapshot: z.coerce.boolean(),
			metaData: z.any().optional()
		}),

		notifications: z.object({
			create: z.coerce.boolean(),
			event: z.string().optional(),
			list: z
				.array(
					z.object({
						_id: z.string().optional(),
						sender: z.string().trim().nonempty({ message: "sender's ID is required for notifications." }),
						senderType: z.string().trim().nonempty({ message: "Sender type is required for notifications." }),
						recipient: z.string().trim().nonempty({ message: "Recipient Id is required for notifications." }),
						recipientType: z.string().trim().nonempty({ message: "Recipient type is required for notifications." })
					})
				)
				.nonempty({ message: "notification list is required." }),
			metaData: z.any().optional(),
			creator: z.string().trim().nonempty({ message: "notification creator is required." }),
			creatorType: z.string().trim().nonempty({ message: "notification creator type is required." })
		})
	})
	.superRefine((data, ctx) => {
		if (data.notifications.notify && !data.notifications.event) {
			ctx.addIssue({
				path: ["notifications", "event"],
				code: "custom",
				message: "Notification event is required when notify is true."
			});
		}
	});

export const manageFamilyTreeSchema = z.object({
	name: z.string().trim().nonempty({ message: "Family name is required." }),
	motto: z.string().optional(),
	email: z.string().trim().nonempty({ message: "email is required." }),
	phone: z.string().trim().nonempty({ message: "phone is required." }),
	origin: z.string().trim().nonempty({ message: "Family origin is required." }),
	established: z.string().trim().nonempty({ message: "Established Date is required." }),
	crest: z.object({
		publicId: z.string().trim().nonempty({ message: "Family crest public ID is required." }),
		url: z.string().trim().nonempty({ message: "Family crest image url is required." }),
		width: z.number().optional(),
		height: z.number().optional()
	}),
	creator: z.string().trim().nonempty({ message: "document creator's ID is required." })
});

export const manageHouseholdSchema = z.object({
	name: z.string().trim().nonempty({ message: "family name is required." }),
	motto: z.string().trim().nonempty({ message: "family motto is required." }),
	origin: z.string().trim().nonempty({ message: "family origin is required." }),
	crest: z.object({
		publicId: z.string().trim().nonempty({ message: "Family crest public ID is required." }),
		url: z.string().trim().nonempty({ message: "Family crest image url is required." }),
		width: z.number().optional(),
		height: z.number().optional()
	}),
	familyTree: z.string().trim().nonempty({ message: "Family tree is required." }),
	generationLevel: z.coerce.number(),
	members: z.array(z.any()).optional(),
	childFamilies: z.array(z.any()).optional(),
	established: z.coerce.date(),
	creator: z.string().trim().nonempty({ message: "household creator is required." })
});

export const FamilyTreeSearchSchema = z.object({
	query: z.string().trim().nonempty({ message: "search query is required." }),
	filter: z.object({
		actions: z.string().trim().nonempty({ message: "filter action is required." }),
		sort: z.string().optional()
	}),
	section: z.string().trim().nonempty({ message: "platform section is required for search query." }),
	user: z.string().trim().nonempty({ message: "user ID is required." }),
	userType: z.string().trim().nonempty({ message: "user type is required for search query." }),
	page: z.coerce.number(),
	limit: z.coerce.number()
});

export const notificationSchema = z.object({
	title: z.string().trim().nonempty({ message: "notification title is required." }),
	event: z.string().trim().nonempty({ message: "notification event is required." }),
	message: z.string().trim().nonempty({ message: "notification message is required." }),
	sender: z.string().trim().nonempty({ message: "notification sender is required." }),
	senderType: z.string().trim().nonempty({ message: "notification sender type is required." }),
	recipient: z.string().trim().nonempty({ message: "notification recipient is required." }),
	recipientType: z.string().trim().nonempty({ message: "notification recipient type is required." }),
	metaData: z.any().optional()
});

export const connectionSearchSchema = z.object({
	query: z.string().trim().nonempty({ message: "query is required." }),
	section: z.string().trim().nonempty({ message: "section is required." }),
	userId: z.string().trim().nonempty({ message: "user ID is required." }),
	userType: z.string().trim().nonempty({ message: "user type is required." }),
	platformSection: z.string().trim().nonempty({ message: "platform section is required." })
});
