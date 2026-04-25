"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../providers/ThemeProvider";
import ImageCard from "../../cards/ImageCard";
import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/20/solid";
import { buttonVariants } from "../../shadcn/button";
import { format } from "date-fns";
import { calculateAge } from "@/app/lib/util/global";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useDeleteFamilyTreeMutation } from "@/app/lib/redux/data-fetching/parents-api";
import { useAtomValue } from "jotai";
import { currentUser } from "@/app/lib/state-management/global-state";
import AddAncestors from "../../overlays/modals/AddAncestors";
import AddRootFamilyMembers from "../../overlays/modals/AddRootFamilyMember";
import AddFamilyBranch from "../../overlays/modals/AddFamilyBranch";
import ManageFamilyTreeLeadership from "../../overlays/modals/ManageFamilyTreeLeadership";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { nanoid } from "nanoid";
import FamilyMemberCard from "../../cards/FamilyMemberCard";
import FamilyMembershipSkeleton from "../../loading-skeletons/FamilyMembershipSkeleton";
import toast from "react-hot-toast";
import AncestorCard from "../../cards/AncestorCard";
import RootMemberCard from "../../cards/RootMemberCard";

export default function HouseholdProfile({ family, editFunction }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const theme = useTheme();
	// console.log("theme", theme);

	const [deleteFamilyTree, deleteFamilyTreeResults] = useDeleteFamilyTreeMutation();

	useEffect(() => {
		if (deleteFamilyTreeResults.isError) {
			const message = typeof deleteFamilyTreeResults.error === "string" ? deleteFamilyTreeResults.error : deleteFamilyTreeResults.error.message;
			toast.error(message);
		} else if (deleteFamilyTreeResults.isSuccess) {
			toast.success(deleteFamilyTreeResults.data.message);
		}
	}, [deleteFamilyTreeResults.isLoading, deleteFamilyTreeResults.isSuccess, deleteFamilyTreeResults.isError]);

	const user = useAtomValue(currentUser);

	const [openAncestorsModal, setOpenAncestorsModal] = useState(false);
	const [openRootFamilyModal, setOpenRootFamilyModal] = useState(false);
	const [openFamilyBranchModal, setOpenFamilyBranchModal] = useState(false);
	const [openFamilyTreeLeadershipModal, setOpenFamilyTreeLeadershipModal] = useState(false);

	const handleAncestorsModal = () => {
		setOpenAncestorsModal(true);
	};

	const closeAncestorsModal = () => {
		setOpenAncestorsModal(false);
	};

	const handleRootFamilyModal = () => {
		setOpenRootFamilyModal(true);
	};

	const CloseRootFamilyModal = () => {
		setOpenRootFamilyModal(false);
	};

	const handleFamilyBranchModal = () => {
		setOpenFamilyBranchModal(true);
	};

	const closeFamilyBranchModal = () => {
		setOpenFamilyBranchModal(false);
	};

	const handleFamilyTreeLeadershipModal = () => {
		setOpenFamilyTreeLeadershipModal(true);
	};

	const closeFamilyTreeLeadershipModal = () => {
		setOpenFamilyTreeLeadershipModal(false);
	};

	const [ancestors, setAncestors] = useState([]);
	const [rootFamilies, setRootFamilies] = useState([]);
	const [familyBranches, setFamilyBranches] = useState([]);

	useEffect(() => {
		if (family) {
			setAncestors(family?.lineage ?? []);
			setRootFamilies(family?.rootFamily ?? []);
			setFamilyBranches(family?.branches ?? []);
		}
	}, [family]);

	return (
		<div className="divide-y divide-gray-200 border border-gray-400 min-h-screen bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 group">
			<div className={classNames(theme.sectionNavbar.root, "px-4 py-5 sm:px-6 relative")}>
				<div className="hidden group-hover:block absolute top-4 right-4">
					<Menu as="div" className="relative">
						<MenuButton className={classNames(buttonVariants({ variant: "WhiteCircularBtn" }), "p-2")}>
							<EllipsisHorizontalIcon aria-hidden="true" className="size-5 text-gray-900" />
						</MenuButton>
						<MenuItems transition className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in grid grid-cols-1 gap-1 p-1">
							<MenuItem>
								<button onClick={() => editFunction(family)} className={classNames(buttonVariants({ variant: "yellowBtn" }))}>
									Edit
								</button>
							</MenuItem>
							<MenuItem>
								<button onClick={() => deleteFamilyTree({ familyId: family._id })} className={classNames(buttonVariants({ variant: "destructiveBtn" }))}>
									delete
								</button>
							</MenuItem>
						</MenuItems>
					</Menu>
				</div>
				<h2 className={classNames("text-xl lg:text-3xl font-bold tracking-tight capitalize text-white text-center")}>{family?.name}</h2>
				<p className={classNames("mx-auto mt-4 max-w-xl text-sm lg:text-base text-white text-center")}>{family?.motto}</p>
			</div>
			<div className="px-4 py-5 sm:p-6 flex-1">
				<div className="mx-auto grid grid-cols-1 sm:grid-cols-2 overflow-y-auto">
					<div className="flex flex-col">
						<div className="p-4">
							<h3 className="capitalize font-semibold text-gray-700 text-xl text-center">family crest</h3>
						</div>
						<div className="w-full grow">
							<div className="size-full flex flex-col justify-center items-center">
								<ImageCard
									image={family?.crest}
									settings={{
										alt: "family crest",
										styles: {
											image: "object-contain object-center",
											background: "size-full bg-gray-300"
										}
									}}
								/>
							</div>
						</div>
					</div>
					<div className="">
						<div className="p-4">
							<h3 className="capitalize font-semibold text-gray-700 text-xl text-center">summary</h3>
						</div>
						<dl className="flex flex-col gap-4 size-full">
							<div className="flex flex-col gap-1">
								<dt className="capitalize text-gray-700 text-center p-4">leadership</dt>
								<dd className="p-4">
									<dl className="flex flex-col gap-1">
										<div className="grid grid-cols-2">
											<dt className=" capitalize text-gray-700 p-1">founder</dt>
											<dd className="">
												{family?.founder ? (
													""
												) : (
													<button onClick={handleFamilyTreeLeadershipModal} className={classNames(buttonVariants({ variant: "greenBtn" }))}>
														<PlusIcon aria-hidden="true" className="mr-1.5 -ml-0.5 w-5 h-5" />
														founder
													</button>
												)}
											</dd>
										</div>
										<div className="grid grid-cols-2">
											<dt className=" capitalize text-gray-700 p-1">current head</dt>
											<dd className="">
												{family?.founder ? (
													""
												) : (
													<button onClick={handleFamilyTreeLeadershipModal} className={classNames(buttonVariants({ variant: "greenBtn" }))}>
														<PlusIcon aria-hidden="true" className="mr-1.5 -ml-0.5 w-5 h-5" />
														current head
													</button>
												)}
											</dd>
										</div>
										<div className="grid grid-cols-2">
											<dt className=" capitalize text-gray-700 p-1">spouse</dt>
											<dd className="">
												{family?.founder ? (
													""
												) : (
													<button onClick={handleFamilyTreeLeadershipModal} className={classNames(buttonVariants({ variant: "greenBtn" }))}>
														<PlusIcon aria-hidden="true" className="mr-1.5 -ml-0.5 w-5 h-5" />
														spouse
													</button>
												)}
											</dd>
										</div>
									</dl>
								</dd>
							</div>
							<div className="flex flex-col gap-1">
								<dt className="capitalize text-gray-700 text-center p-4">family stats</dt>
								<dd className="p-4">
									<dl className="flex flex-col gap-1">
										<div className="grid grid-cols-2">
											<dt className="capitalize text-gray-700 p-1">established</dt>
											<dd className="">
												{family?.established ? (
													format(family.established, "MM/dd/yyyy")
												) : (
													<button className={classNames(buttonVariants({ variant: "blueBtn" }))}>
														<PlusIcon aria-hidden="true" className="mr-1.5 -ml-0.5 w-5 h-5" />
														current head
													</button>
												)}
											</dd>
										</div>
										<div className="grid grid-cols-2">
											<dt className=" capitalize text-gray-700 p-1">family origin</dt>
											<dd className="">{family?.origin}</dd>
										</div>
										<div className="grid grid-cols-2">
											<dt className=" capitalize text-gray-700 p-1">family age</dt>
											<dd className="">{calculateAge(family?.established)}</dd>
										</div>
										<div className="grid grid-cols-2">
											<dt className=" capitalize text-gray-700 p-1">total branches</dt>
											<dd className="">{family?.branches?.length}</dd>
										</div>
										<div className="grid grid-cols-2">
											<dt className=" capitalize text-gray-700 p-1">total members</dt>
											<dd className="">{family?.totalMembers}</dd>
										</div>
									</dl>
								</dd>
							</div>
							<div className="flex flex-col gap-1">
								<dt className="capitalize text-gray-700 text-center p-4">contact info.</dt>
								<dd className="p-4">
									<dl className="flex flex-col gap-1">
										<div className="grid grid-cols-2">
											<dt className=" capitalize text-gray-700 p-1">email</dt>
											<dd className="">{family?.email}</dd>
										</div>
										<div className="grid grid-cols-2">
											<dt className=" capitalize text-gray-700 p-1">phone</dt>
											<dd className="">{family?.phone}</dd>
										</div>
									</dl>
								</dd>
							</div>
						</dl>
					</div>
					<div className="col-span-full row-start-2 row-end-2 flex flex-col overflow-y-auto">
						<div className="px-4 py-5 sm:px-6">
							<h4 className="capitalize font-semibold text-gray-700 text-xl text-center">family structure</h4>
						</div>
						<dl className="flex flex-col gap-5 grow">
							<div className="grow flex flex-col gap-2">
								<dt className="capitalize text-gray-700 flex justify-start items-center gap-2">
									lineage
									{family?.creator === user?._id && (
										<button onClick={handleAncestorsModal} className={classNames(buttonVariants({ variant: "greenCircularBtn" }))}>
											<PlusIcon aria-hidden="true" className="size-5" />
										</button>
									)}
								</dt>
								<dd className="grow">
									<Swiper
										slidesPerView={1}
										breakpoints={{
											100: {
												slidesPerView: 1
											},
											450: {
												slidesPerView: 2
											},
											700: {
												slidesPerView: 3
											},
											1000: {
												slidesPerView: 4
											}
										}}
										spaceBetween={10}
										loop={ancestors.length > 4}
										autoplay={{
											delay: 4500,
											disableOnInteraction: false,
											pauseOnMouseEnter: true
										}}
										navigation={true}
										modules={[Navigation, Autoplay]}
										className="swiper swiper__container">
										{ancestors.length === 0
											? Array.from({ length: 4 }).map(() => (
													<SwiperSlide className="size-full flex flex-col justify-center items-center">
														<FamilyMembershipSkeleton key={nanoid()} />
													</SwiperSlide>
												))
											: ancestors.map((ancestor) => <SwiperSlide className="size-full flex flex-col justify-center items-center"></SwiperSlide>)}
									</Swiper>
								</dd>
							</div>
							<div className="grow flex flex-col gap-2">
								<dt className="capitalize text-gray-700 flex justify-start items-center gap-2">
									root family members
									{family?.creator === user?._id && (
										<button onClick={handleRootFamilyModal} className={classNames(buttonVariants({ variant: "greenCircularBtn" }))}>
											<PlusIcon aria-hidden="true" className="size-5" />
										</button>
									)}
								</dt>
								<dd className="grow">
									<Swiper
										slidesPerView={1}
										breakpoints={{
											100: {
												slidesPerView: 1
											},
											450: {
												slidesPerView: 2
											},
											700: {
												slidesPerView: 3
											},
											1000: {
												slidesPerView: 4
											}
										}}
										spaceBetween={10}
										loop={rootFamilies.length > 4}
										autoplay={{
											delay: 4500,
											disableOnInteraction: false,
											pauseOnMouseEnter: true
										}}
										navigation={true}
										modules={[Navigation, Autoplay]}
										className="swiper swiper__container">
										{rootFamilies.length === 0
											? Array.from({ length: 4 }).map(() => (
													<SwiperSlide className="size-full flex flex-col justify-center items-center">
														<FamilyMembershipSkeleton key={nanoid()} />
													</SwiperSlide>
												))
											: rootFamilies.map((family) => <SwiperSlide className="size-full flex flex-col justify-center items-center">{/* <RootMemberCard member={family.member} tree={tree} /> */}</SwiperSlide>)}
									</Swiper>
								</dd>
							</div>
							<div className="grow flex flex-col gap-2">
								<dt className="capitalize text-gray-700 flex justify-start items-center gap-2">
									family branches
									{family?.creator === user?._id && (
										<button onClick={handleFamilyBranchModal} className={classNames(buttonVariants({ variant: "greenCircularBtn" }))}>
											<PlusIcon aria-hidden="true" className="size-5" />
										</button>
									)}
								</dt>
								<dd className="grow">
									<Swiper
										slidesPerView={1}
										breakpoints={{
											100: {
												slidesPerView: 1
											},
											450: {
												slidesPerView: 2
											},
											700: {
												slidesPerView: 3
											},
											1000: {
												slidesPerView: 4
											}
										}}
										spaceBetween={10}
										loop={familyBranches.length > 4}
										autoplay={{
											delay: 4500,
											disableOnInteraction: false,
											pauseOnMouseEnter: true
										}}
										navigation={true}
										modules={[Navigation, Autoplay]}
										className="swiper swiper__container">
										{familyBranches.length === 0
											? Array.from({ length: 4 }).map(() => (
													<SwiperSlide className="size-full flex flex-col justify-center items-center">
														<FamilyMembershipSkeleton key={nanoid()} />
													</SwiperSlide>
												))
											: familyBranches.map((branch) => (
													<SwiperSlide className="size-full flex flex-col justify-center items-center">
														<FamilyMemberCard member={branch} />
													</SwiperSlide>
												))}
									</Swiper>
								</dd>
							</div>
						</dl>
					</div>
				</div>
				<div className="hidden">
					{/* <AddAncestors open={openAncestorsModal} closingFunction={closeAncestorsModal} family={family} />
					<AddRootFamilyMembers open={openRootFamilyModal} closingFunction={CloseRootFamilyModal} family={family} />
					<AddFamilyBranch open={openFamilyBranchModal} closingFunction={closeFamilyBranchModal} family={family} />
					<ManageFamilyTreeLeadership open={openFamilyTreeLeadershipModal} closingFunction={closeFamilyTreeLeadershipModal} family={family} /> */}
				</div>
			</div>
		</div>
	);
}
