"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, TransitionChild } from "@headlessui/react";
import { Bars3Icon, BellIcon, ChevronUpIcon, Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { dynamicInternalNavlist, signCurrentUserOut } from "@/app/lib/util/frontend-helper-functions";
import { useAtom, useAtomValue } from "jotai";
import { currentDepartment, currentUser } from "@/app/lib/state-management/global-state";
import Link from "next/link";
import { PLATFORM_INFRASTRUCTURE } from "@/scripts/platform-infrastructure";
import { usePathname, useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { useTheme } from "../providers/ThemeProvider";

const userNavigation = [
	{ id: nanoid(), name: "Your profile", href: "#", type: "link" },
	{ id: nanoid(), name: "Sign out", type: "button" }
];

export default function InternalLayout({ children }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const department = useAtomValue(currentDepartment);

	const [navigation, setNavigation] = useState([]);

	const theme = useTheme();

	useEffect(() => {
		if (department) {
			const navlist = dynamicInternalNavlist(department);
			setNavigation(navlist);
		}
	}, [department]);

	const path = usePathname();

	const router = useRouter();

	const [user, setUser] = useAtom(currentUser);

	console.log("user", user);

	const handleUserSignOut = async () => {
		const logOut = await signCurrentUserOut();

		if (logOut.success === true) {
			setUser("");
			router.push("/login");
		}
	};

	return (
		department && (
			<div>
				<Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
					<DialogBackdrop transition className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0" />

					<div className="fixed inset-0 flex">
						<DialogPanel transition className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full">
							<TransitionChild>
								<div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
									<button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
										<span className="sr-only">Close sidebar</span>
										<XMarkIcon aria-hidden="true" className="size-6 text-white" />
									</button>
								</div>
							</TransitionChild>

							{/* Sidebar component, swap this element with another sidebar if you like */}
							<div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4 dark:bg-indigo-800 dark:ring-1 dark:ring-white/10">
								<div className="flex h-16 shrink-0 items-center">
									<img alt="Your Company" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white" className="h-8 w-auto" />
								</div>
								<nav className="flex flex-1 flex-col">
									<ul role="list" className="flex flex-1 flex-col gap-y-7">
										{navigation?.map((section) => (
											<li key={section.id}>
												<div className="text-xs/6 font-semibold text-indigo-200 dark:text-indigo-100">{section.sectionTitle}</div>
												<ul role="list" className="-mx-2 mt-2 space-y-1">
													{section.list.map((item) => (
														<li key={item.id}>
															<Link href={item.href} className={classNames(path.includes(item.href) ? `${theme.contrast} ${theme.text.dark}` : `${theme.text.primary} ${theme.hover} hover:${theme.text.dark}`, "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold")}>
																<span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white dark:border-indigo-500/50 dark:bg-indigo-700">{item.initial}</span>
																<span className="truncate">{item.name}</span>
															</Link>
														</li>
													))}
												</ul>
											</li>
										))}
										<li className="mt-auto">
											<Link href="#" className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-indigo-200 hover:bg-indigo-700 hover:text-white dark:text-indigo-100 dark:hover:bg-indigo-950/25">
												<Cog6ToothIcon aria-hidden="true" className="size-6 shrink-0 text-indigo-200 group-hover:text-white dark:text-indigo-100" />
												Settings
											</Link>
										</li>
									</ul>
								</nav>
							</div>
						</DialogPanel>
					</div>
				</Dialog>

				{/* Static sidebar for desktop */}
				<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className={classNames(theme?.base, "relative flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4 dark:bg-indigo-800 dark:after:pointer-events-none dark:after:absolute dark:after:inset-y-0 dark:after:right-0 dark:after:w-px dark:after:bg-white/10")}>
						<div className="flex h-16 shrink-0 items-center">
							<img alt="Your Company" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white" className="h-8 w-auto" />
						</div>
						<nav className="flex flex-1 flex-col">
							<ul role="list" className="flex flex-1 flex-col gap-y-7">
								{navigation.map((section) => (
									<li key={section._id}>
										<div className="text-xs/6 font-semibold text-indigo-200 dark:text-indigo-100">{section.sectionTitle}</div>
										<ul role="list" className="-mx-2 mt-2 space-y-1">
											{section?.list?.map((item, idx) => (
												<li key={item?._id ?? idx}>
													<Link href={item?.href} className={classNames(path.includes(item.href) ? `${theme.contrast} ${theme.text.dark}` : `${theme.text.primary} ${theme.hover} hover:${theme.text.dark}`, "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold")}>
														{item.icon && <item.icon aria-hidden="true" className={classNames("size-6 shrink-0")} />}
														<span className="truncate capitalize">{item.name}</span>
													</Link>
												</li>
											))}
										</ul>
									</li>
								))}

								<li>
									<div className={classNames(theme.text.dark, "text-xs/6 font-semibold capitalize")}>platform sections</div>
									{PLATFORM_INFRASTRUCTURE.map((section) => {
										if (section.display) {
											return (
												<Disclosure key={section._id} as="div" className="py-3">
													<h3 className="-my-3 flow-root">
														<DisclosureButton className={classNames(path.includes(section.href) ? `${theme.contrast} ${theme.text.dark}` : `${theme.text.primary} ${theme.hover} hover:${theme.text.dark}`, "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold capitalize w-full")}>
															{/* <section.icon aria-hidden="true" className={classNames("h-6 w-6 shrink-0")} /> */}
															<span className="truncate capitalize">{section.sectionTitle}</span>
															<span className="ml-6 flex items-center grow justify-end">
																<ChevronDownIcon aria-hidden="true" className="w-5 h-5 group-data-open:hidden" />
																<ChevronUpIcon aria-hidden="true" className="w-5 h-5 group-[&:not([data-open])]:hidden" />
															</span>
														</DisclosureButton>
													</h3>
													<DisclosurePanel className="pt-6">
														<ul role="list" className="ml-10 mt-2 space-y-1">
															{section.list.map((item) => {
																if (item.display) {
																	return (
																		<li key={item._id}>
																			<Link href={item.href} className={classNames(path.includes(item.href) ? `${theme.contrast} ${theme.text.dark}` : `${theme.text.primary} ${theme.hover} hover:${theme.text.dark}`, "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold capitalize")}>
																				<item.icon aria-hidden="true" className={classNames("h-6 w-6 shrink-0")} />
																				<span className="truncate">{item.name}</span>
																			</Link>
																		</li>
																	);
																}
															})}
														</ul>
													</DisclosurePanel>
												</Disclosure>
											);
										}
									})}
								</li>

								<li className="mt-auto">
									<Link href="#" className={classNames(`${theme.text.primary} ${theme.hover} hover:${theme.text.dark}`, "group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold")}>
										<Cog6ToothIcon aria-hidden="true" className="size-6 shrink-0 text-indigo-200 group-hover:text-white dark:text-indigo-100" />
										Settings
									</Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>

				<div className="lg:pl-72">
					<div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8 dark:border-white/10 dark:bg-gray-900 dark:shadow-none">
						<button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden dark:text-gray-400 dark:hover:text-white">
							<span className="sr-only">Open sidebar</span>
							<Bars3Icon aria-hidden="true" className="size-6" />
						</button>

						{/* Separator */}
						<div aria-hidden="true" className="h-6 w-px grow" />

						<div className="flex justify-end gap-x-4 self-stretch lg:gap-x-6">
							<div className="flex items-center gap-x-4 lg:gap-x-6">
								<button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-whie hover:bg-gray-400 rounded-full cursor-pointer group">
									<span className="sr-only">View notifications</span>
									<BellIcon aria-hidden="true" className="size-6 fill-white border-white group-hover:animate-ping" />
								</button>

								{/* Separator */}
								<div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10 dark:lg:bg-gray-100/10" />

								{/* Profile dropdown */}
								<Menu as="div" className="relative">
									<MenuButton className="relative flex items-center">
										<span className="absolute -inset-1.5" />
										<span className="sr-only">Open user menu</span>
										{user?.image ? <img alt="login image" src={user?.image?.url} className="size-8 rounded-full bg-gray-50 outline -outline-offset-1 outline-black/5 dark:bg-gray-800 dark:outline-white/10 object-cover object-center" /> : <UserCircleIcon className="size-8" />}

										<span className="hidden lg:flex lg:items-center">
											<span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-900 dark:text-white capitalize">
												{user?.name}
											</span>
											<ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-400 dark:text-gray-500" />
										</span>
									</MenuButton>
									<MenuItems transition className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg outline outline-gray-900/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
										{userNavigation.map((item) => (
											<MenuItem key={item.name}>
												{item.type === "link" ? (
													<Link href={item.href} className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-indigo-500 data-focus:text-white data-focus:outline-hidden dark:text-white dark:data-focus:bg-white/5 w-full text-left ">
														{item.name}
													</Link>
												) : (
													<button onClick={handleUserSignOut} className={classNames("block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-indigo-500 data-focus:text-white data-focus:outline-hidden dark:text-white dark:data-focus:bg-white/5 w-full text-left")}>
														{item.name}
													</button>
												)}
											</MenuItem>
										))}
									</MenuItems>
								</Menu>
							</div>
						</div>
					</div>

					<main className="min-h-screen">{children}</main>
				</div>
			</div>
		)
	);
}
