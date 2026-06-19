"use client";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { buttonVariants } from "../../shadcn/button";
import { useTheme } from "../../providers/ThemeProvider";
import { useAddToCollectionMutation, useLazyGetCollectionsQuery, useLazyGetCollectionToAddQuery } from "@/app/lib/redux/data-fetching/global-api";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import { nanoid } from "zod";
import CollectionCard from "../../cards/CollectionCard";
import { fromZodError } from "zod-validation-error";
import { manageCollectionSchema } from "@/app/lib/util/global/zod-validations";

export default function ManageCollections({ open, closingFunction, savedItem }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const [formContent, setFormContent] = useState({
		savedItemId: "",
		collectionId: ""
	});

	const clearForm = () => {
		setFormContent({
			savedItemId: "",
			collectionId: ""
		});
	};

	const theme = useTheme();

	const user = useAtomValue(currentUser);

	const [collections, setCollections] = useState([]);

	const pageSizes = [
		{
			id: nanoid(),
			value: 10
		},
		{
			id: nanoid(),
			value: 20
		},
		{
			id: nanoid(),
			value: 30
		},
		{
			id: nanoid(),
			value: 40
		}
	];
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(pageSizes[0].value);
	const [filters, setFilters] = useState({
		sort: "newest",
		exclude: ""
	});

	useEffect(() => {
		if (open === true && savedItem.location) {
			setFilters((filters) => ({
				...filters,
				exclude: savedItem.location
			}));
		}
	}, [open, savedItem.location]);

	const handlePagination = (_, page) => {
		setPage(page);
	};

	const [getCollections, getCollectionsResults] = useLazyGetCollectionToAddQuery();

	useEffect(() => {
		if (getCollectionsResults.isError) {
			const message = typeof getCollectionsResults.error === "string" ? getCollectionsResults.error : getCollectionsResults.error.message;
			toast.error(message);
		} else if (getCollectionsResults.isSuccess) {
			const { results } = getCollectionsResults.data;

			setCollections(results?.collections ?? []);
			setTotalPages(results?.totalPages ?? 0);
		}
	}, [getCollectionsResults.isFetching, getCollectionsResults.isSuccess, getCollectionsResults.isError]);

	useEffect(() => {
		if (user && open === true) {
			getCollections({ userId: user?._id, page, limit, filters: JSON.stringify(filters) });
		}
	}, [open, user, page, limit, filters]);

	const [addToCollection, addToCollectionResults] = useAddToCollectionMutation();

	useEffect(() => {
		if (addToCollectionResults.isError) {
			const message = typeof addToCollectionResults.error === "string" ? addToCollectionResults.error : addToCollectionResults.error.message;
			toast.error(message);
		} else if (addToCollectionResults.isSuccess) {
			toast.success(addToCollectionResults.data.message);

			clearForm();
			closingFunction();
		}
	}, [addToCollectionResults.isLoading, addToCollectionResults.isSuccess, addToCollectionResults.isError]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const validation = manageCollectionSchema.safeParse(formContent);

		if (validation.success) {
			addToCollection(validation.data);
		} else {
			const error = fromZodError(validation.error);
			error.details.map((error) => toast.error(error.message));
		}
	};

	const handleChanges = (selection) => {
		setFormContent((prev) => ({
			...prev,
			...selection
		}));
	};

	return (
		<Dialog open={open} onClose={closingFunction} className="relative z-10">
			<DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50" />

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10">
						<form onSubmit={handleSubmit} className="size-full">
							<div>
								<div className={classNames(theme.base, "p-4 rounded-t-md")}>
									<DialogTitle as="h3" className="text-base font-semibold text-white text-center capitalize">
										Manage collections
									</DialogTitle>
								</div>
								<div className="mt-3 text-center sm:mt-5">
									<ul role="list" className="divide-y divide-gray-200 dark:divide-white/10">
										{collections.map((collection) => (
											<li
												key={collection._id}
												onClick={() =>
													handleChanges({
														savedItemId: savedItem?._id ?? "",
														collectionId: collection?._id ?? ""
													})
												}
												className={classNames(formContent.collectionId === collection._id ? "bg-blue-500 p-0.5 rounded-lg" : "")}>
												<CollectionCard collection={collection} />
											</li>
										))}
									</ul>
								</div>
							</div>
							<div className="mt-5 sm:mt-6 grid sm:grid-flow-row-dense sm:grid-cols-2 gap-3">
								<button type="submit" className={classNames(buttonVariants({ variant: "greenBtn" }))}>
									add
								</button>
								<button type="button" data-autofocus onClick={closingFunction} className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
									Cancel
								</button>
							</div>
						</form>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}
