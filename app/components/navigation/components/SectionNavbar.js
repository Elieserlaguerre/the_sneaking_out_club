"use client";
import { CloseButton, Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverGroup, PopoverPanel } from "@headlessui/react";
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { currentDepartment, currentUser } from "@/app/lib/state-management/global-state";
import { dynamicLayoutThemeColor, handleDepartmentThemeColor } from "@/app/lib/util/frontend-helper-functions";

export default function SectionNavbar({ navList, profile }) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [hideMobileButton, setHideMobileButton] = useState(false);
	const department = useAtomValue(currentDepartment);
	const user = useAtomValue(currentUser);
	const path = usePathname();
	const segments = path.split("/").filter(Boolean);
	const basePath = `/${segments.slice(0, 3).join("/")}`;
	const lastRouteSegments = `/${segments.slice(3, 5).join("/")}`;

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	useEffect(() => {
		navList.forEach((section) => (section?.component?.hideMobileButton ? setHideMobileButton(true) : setHideMobileButton(false)));
	}, [path]);

	const theme = dynamicLayoutThemeColor(department);

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	return (
		<div className={classNames(theme.sectionNavbar.root)}>
			<header className="relative isolate z-40">
				<nav aria-label="Global" className={classNames(navList.length > 15 ? "max-w-full" : "max-w-7xl", "mx-auto flex items-center justify-end lg:justify-start p-6 lg:px-8 gap-4")}>
					<div className={classNames(hideMobileButton ? "hidden" : "flex lg:hidden")}>
						<button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
							<span className="sr-only">Open main menu</span>
							<Bars3Icon aria-hidden="true" className="h-6 w-6 text-white" />
						</button>
					</div>

					{navList?.map((section, i) => {
						if (section.title) {
							return (
								<Link key={i} className={classNames(profile?.active && section.href === lastRouteSegments ? "ring-1 ring-white rounded-sm" : path === section.href && `ring-1 ring-white rounded-sm`, theme.text.navbar, "hidden lg:flex items-center gap-x-1 text-sm font-semibold leading-6 capitalize px-2.5 py-1 hover:ring hover:ring-white hover:rounded-sm")} href={profile?.active ? `${basePath}${section.href}` : section.href}>
									{section.title}
								</Link>
							);
						}

						if (section.panel) {
							return (
								<PopoverGroup key={i} className="hidden lg:flex lg:gap-x-12">
									<Popover>
										<PopoverButton className={classNames(path === section.href ? "ring-1 ring-white rounded-sm" : null, "flex items-center gap-x-1 text-sm font-semibold leading-6 text-white capitalize px-2.5 py-1 hover:ring hover:ring-white hover:rounded-sm")}>
											{section.panel.title}
											<ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-white" />
										</PopoverButton>

										<PopoverPanel transition="true" className={classNames("absolute inset-x-0 top-20 -z-10 bg-white pt-2 shadow-lg ring-1 ring-gray-900/5 transition data-closed:-translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-leave:duration-150 data-enter:ease-out data-leave:ease-in")}>
											<div className={classNames(section.panel.nav.length < 4 ? `grid grid-cols-${section.panel.nav.length}` : "grid grid-cols-4", "mx-auto max-w-7xl px-6 py-5 lg:px-8 divide-x divide-gray-400")}>
												{section.panel.nav.map((nav, i) => (
													<div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
														{nav.title && <div className="px-4 py-5 sm:px-6">{nav.title}</div>}
														<div className="px-4 py-5 sm:p-6">
															<ol className="w-full h-full leading-8">
																{nav.links.map((link, i) => (
																	<PopoverButton key={i} as={Link} href={profile?.active ? `${basePath}${link.href}` : link.href} className={classNames(link.href === path ? "bg-indigo-500 text-white" : null, "capitalize font-semibold hover:bg-indigo-500 cursor-pointer hover:text-white block w-full text-left pl-2")}>
																		{link.name}
																	</PopoverButton>
																))}
															</ol>
														</div>
													</div>
												))}
											</div>
										</PopoverPanel>
									</Popover>
								</PopoverGroup>
							);
						}

						if (section.component) {
							return (
								<div key={i} className={classNames(theme.text.navbar, "w-full")}>
									{section.component.elements}
								</div>
							);
						}
					})}
				</nav>

				{/* mobile device navbar */}
				<Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
					<div className="fixed inset-0 z-10" />
					<DialogPanel className={classNames(profile?.active ? "top-14" : "top-34", "fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10")}>
						<div className="flex items-center justify-between">
							<Link href="#" className="-m-1.5 p-1.5">
								<span className="sr-only">synergistic enterprises</span>
							</Link>
							<button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
								<span className="sr-only">Close menu</span>
								<XMarkIcon aria-hidden="true" className="h-6 w-6" />
							</button>
						</div>
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10">
								<div className="space-y-2 py-6">
									{navList?.map((section, i) => {
										if (section.title) {
											return (
												<Link key={i} onClick={() => setMobileMenuOpen(false)} className={classNames(path === section.href ? "ring-1 ring-black" : null, "group flex w-full items-center justify-between rounded-lg py-2 px-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 capitalize")} href={profile?.active ? `${basePath}${section.href}` : section.href}>
													{section.title}
												</Link>
											);
										}

										if (section.panel) {
											return (
												<Disclosure key={i} as="div" className="-mx-3">
													<DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 capitalize">
														{section.panel.title}
														<ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-open:rotate-180" />
													</DisclosureButton>
													<DisclosurePanel className="mt-2 space-y-2">
														{({ close }) => {
															return section.panel.nav.map((nav) => {
																return nav.links.map((link) => (
																	<CloseButton
																		onClick={() => {
																			close();
																			setMobileMenuOpen(false);
																		}}
																		key={link.name}
																		as={Link}
																		href={profile?.active ? `${basePath}${link.href}` : link.href}
																		className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900  hover:bg-indigo-500 hover:text-white">
																		{link.name}
																	</CloseButton>
																));
															});
														}}
													</DisclosurePanel>
												</Disclosure>
											);
										}
									})}
								</div>
							</div>
						</div>
					</DialogPanel>
				</Dialog>
			</header>
		</div>
	);
}
