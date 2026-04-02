"use client";

import React, { useEffect } from "react";
import z from "zod";

export default function Image({ image, settings }) {
	const settingsSchema = z.object({
		alt: z.string().trim().nonempty({ message: "alt text is required for Image component and it must be of type string." }),
		styles: z.object({
			image: z.string().trim().nonempty({ message: "image styles is required and must be a string." }),
			background: z.string().trim().optional()
		})
	});

	useEffect(() => {
		settingsSchema.parse(settings);
	}, [settings]);

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const imageSchema = z.instanceof(File);

	const dynamicImageDisplay = () => {
		const imageValidation = imageSchema.safeParse(image);

		if (imageValidation.success) {
			const url = URL.createObjectURL(image);
			return <img src={url} className={classNames(settings?.styles?.image)} alt={settings.alt} />;
		} else {
			if (image) return <img src={image?.url} className={classNames(settings?.styles?.image)} alt={settings.alt} />;
			else return <div className="size-full bg-gray-300" />;
		}
	};

	return <div className={classNames(settings?.styles?.background, "overflow-hidden bg-white flex justify-center items-center size-full")}>{dynamicImageDisplay()}</div>;
}
