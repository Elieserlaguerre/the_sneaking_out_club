import { useState, useCallback } from "react";

export function useUploadMutation(options) {
	const folder = options?.folder;

	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);

	const reset = () => {
		setData(null);
		setError(null);
		setIsLoading(false);
		setIsSuccess(false);
		setIsError(false);
	};

	const trigger = useCallback(
		async (file, overrideOptions = {}) => {
			setIsLoading(true);
			setIsSuccess(false);
			setIsError(false);
			setError(null);

			try {
				/*
			==========================
			1. GET SIGNATURE FROM API
			==========================
			*/
				const sigRes = await fetch("/api/v1/global/uploads/signature", {
					method: "POST",
					body: JSON.stringify(options)
				});

				if (!sigRes.ok) {
					throw new Error("Failed to generate upload signature");
				}

				console.log("sigRes", sigRes);

				const response = await sigRes.json();
				const { results } = response;

				const { signature, timestamp, apiKey, cloudName, subfolder, public_id } = results;

				/*
			==========================
			2. DIRECT CLOUDINARY UPLOAD
			==========================
			*/
				const formData = new FormData();
				formData.append("file", file);
				formData.append("api_key", apiKey);
				formData.append("timestamp", timestamp);
				formData.append("signature", signature);
				formData.append("folder", subfolder);
				formData.append("public_id", public_id);

				// Optional transformations
				if (options?.transformation) {
					formData.append("transformation", options.transformation);
				}

				const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
					method: "POST",
					body: formData
				});

				const result = await res.json();

				if (!res.ok) {
					throw new Error(result.error?.message || "Upload failed");
				}

				const formatted = {
					url: result.secure_url,
					publicId: result.public_id,
					width: result.width,
					height: result.height,
					format: result.format
				};

				setData({
					results: formatted,
					message: "Upload successful"
				});

				setIsSuccess(true);

				return formatted;
			} catch (err) {
				setError(err);
				setIsError(true);
				throw err;
			} finally {
				setIsLoading(false);
			}
		},
		[folder, options]
	);

	return [
		trigger,
		{
			data,
			error,
			isLoading,
			isSuccess,
			isError,
			reset
		}
	];
}
