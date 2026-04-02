import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import React, { Fragment } from "react";
import ReduxProvider from "../providers/ReduxProvider";
import ToasterProvider from "../providers/ToasterProvider";
import JotaiProvider from "../providers/JotaiProvider";
import DomainProvider from "../providers/DomainProvider";
import { cookies } from "next/headers";
import Session from "../providers/SessionProvider";
import UserProvider from "../providers/UserProvider";
import { Analytics } from "@vercel/analytics/react";
import { TooltipProvider } from "../shadcn/tooltip";
import { ThemeProvider } from "../providers/ThemeProvider";

export default async function ProvidersLayout({ children }) {
	const cookieStore = await cookies();
	const subdomain = cookieStore.get("current_subdomain").value;
	// console.log("ProvidersLayout.js subdomain", subdomain);

	return (
		<Fragment>
			<AppRouterCacheProvider>
				<ReduxProvider>
					<ToasterProvider>
						<Session>
							<TooltipProvider>
								<JotaiProvider>
									<DomainProvider subdomain={subdomain}>
										<ThemeProvider department={subdomain}>
											<UserProvider>{children}</UserProvider>
										</ThemeProvider>
									</DomainProvider>
								</JotaiProvider>
							</TooltipProvider>
						</Session>
					</ToasterProvider>
				</ReduxProvider>
			</AppRouterCacheProvider>
			<Analytics />
		</Fragment>
	);
}
