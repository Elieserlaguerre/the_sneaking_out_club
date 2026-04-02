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
		address2: z.string().trim().optional(),
		accountType: z.any().refine((value) => value !== "select one", { message: "account type is required." }),
		city: z.string().trim().min(1, { message: "city is required." }),
		state: z.string().trim().min(1, { message: "state is required." }),
		zipCode: z.string().trim().nonempty({ message: "zip code/region is required." }),
		country: z.string().trim().nonempty({ message: "Country is required." })
	})
	.refine((data) => data.password === data.confirmPassword, { message: "password must match.", path: ["confirmPassword"] });

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
	image: z.instanceof(File),
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
