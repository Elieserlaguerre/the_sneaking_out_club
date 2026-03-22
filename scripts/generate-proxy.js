// scripts/generate-proxy.js
// Final: Adds dynamic route scanning for root (main) app external/internal sections.

import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import crypto from "crypto";
import chokidar from "chokidar";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const APP_DIR = path.join(PROJECT_ROOT, "app");
const SUBDOMAINS_JSON = path.join(PROJECT_ROOT, "subdomains.json");
const OUTPUT_MIDDLEWARE = path.join(PROJECT_ROOT, "proxy.js");

// Folders to ignore when scanning app/
const EXCLUDED_FOLDERS = ["api", "components", "lib", "styles", "public", "node_modules", "utils", "templates"];

let debounceTimer = null;
const DEBOUNCE_MS = 1000;
function debounce(cb) {
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(cb, DEBOUNCE_MS);
}

function sha256(str) {
	return crypto.createHash("sha256").update(str).digest("hex");
}

async function getImmediateDirectories(dirPath) {
	try {
		const entries = await fsp.readdir(dirPath, { withFileTypes: true });
		return entries.filter((e) => e.isDirectory()).map((d) => d.name);
	} catch {
		return [];
	}
}

async function readSectionRoutes(folderPathCandidates = []) {
	for (const p of folderPathCandidates) {
		if (!p) continue;
		try {
			if (!fs.existsSync(p)) continue;
			const names = await getImmediateDirectories(p);
			const valid = names.filter((n) => {
				const lower = n.toLowerCase();
				return !/^[._]/.test(n) && !EXCLUDED_FOLDERS.includes(n) && !lower.includes("components") && !lower.includes("hooks") && !lower.includes("lib") && !lower.includes("styles");
			});
			return valid;
		} catch {}
	}
	return [];
}

async function collectPartnersInternalRoutes(baseFolder) {
	const internalSectionVariants = [path.join(baseFolder, "(internal-section)"), path.join(baseFolder, "internal-section")];
	let internalRoot = null;
	for (const cand of internalSectionVariants) {
		if (fs.existsSync(cand)) {
			internalRoot = cand;
			break;
		}
	}
	if (!internalRoot) return [];
	const children = await getImmediateDirectories(internalRoot);
	const normalized = (s) => String(s).toLowerCase().replace(/[_\s]/g, "-");
	const accountFolders = ["retail-account", "service-account", "content-account"];
	const aggregated = new Set();
	for (const account of accountFolders) {
		const match = children.find((c) => normalized(c) === normalized(account));
		if (!match) continue;
		const accountPath = path.join(internalRoot, match);
		const dirs = await getImmediateDirectories(accountPath);
		dirs.forEach((d) => {
			if (!EXCLUDED_FOLDERS.includes(d)) aggregated.add(d);
		});
	}
	children.forEach((c) => {
		if (!EXCLUDED_FOLDERS.includes(c)) aggregated.add(c);
	});
	return Array.from(aggregated);
}

async function collectRoutesForSubdomain(subdomain) {
	const normalize = (s) => String(s).toLowerCase().replace(/[_\s]/g, "-");
	const baseExact = path.join(APP_DIR, subdomain);
	if (fs.existsSync(baseExact)) {
		const externalCandidates = [path.join(baseExact, "(external-section)"), path.join(baseExact, "external-section")];
		const internalCandidates = [path.join(baseExact, "(internal-section)"), path.join(baseExact, "internal-section")];
		const externalRoutes = await readSectionRoutes(externalCandidates);
		let internalRoutes = [];
		if (subdomain.toLowerCase() === "partners") {
			internalRoutes = await collectPartnersInternalRoutes(baseExact);
		} else {
			internalRoutes = await readSectionRoutes(internalCandidates);
		}
		return { subdomain, externalRoutes, internalRoutes };
	}
	try {
		const entries = await fsp.readdir(APP_DIR, { withFileTypes: true });
		const folderNames = entries.filter((e) => e.isDirectory()).map((d) => d.name);
		const ciMatch = folderNames.find((n) => n.toLowerCase() === subdomain.toLowerCase());
		if (ciMatch) return collectRoutesForSubdomain(ciMatch);
		const normalizedTarget = normalize(subdomain);
		const normMatch = folderNames.find((n) => normalize(n) === normalizedTarget);
		if (normMatch) return collectRoutesForSubdomain(normMatch);
		const containsMatch = folderNames.find((n) => n.toLowerCase().includes(subdomain.toLowerCase()) || subdomain.toLowerCase().includes(n.toLowerCase()));
		if (containsMatch) return collectRoutesForSubdomain(containsMatch);
		return { subdomain, externalRoutes: [], internalRoutes: [] };
	} catch {
		return { subdomain, externalRoutes: [], internalRoutes: [] };
	}
}

async function readSubdomainsFile() {
	try {
		const raw = await fsp.readFile(SUBDOMAINS_JSON, "utf8");
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.map((p) => (typeof p === "string" ? p : p.subdomain)).filter(Boolean);
	} catch {
		return [];
	}
}

async function collectRootAppRoutes() {
	const externalCandidates = [path.join(APP_DIR, "(external-section)"), path.join(APP_DIR, "external-section")];
	const internalCandidates = [path.join(APP_DIR, "(internal-section)"), path.join(APP_DIR, "internal-section")];
	const rootExternalRoutes = await readSectionRoutes(externalCandidates);
	const rootInternalRoutes = await readSectionRoutes(internalCandidates);
	return { rootExternalRoutes, rootInternalRoutes };
}

async function buildPlatformRoutes() {
	const names = await readSubdomainsFile();
	const results = [];
	for (const n of names) {
		const r = await collectRoutesForSubdomain(n);
		r.externalRoutes = Array.from(new Set(r.externalRoutes.map((s) => s.trim()).filter(Boolean)));
		r.internalRoutes = Array.from(new Set(r.internalRoutes.map((s) => s.trim()).filter(Boolean)));
		results.push(r);
	}
	const root = await collectRootAppRoutes();
	return { platformRoutes: results, ...root };
}

function generateMiddlewareContent({ platformRoutes, rootExternalRoutes, rootInternalRoutes }) {
	const routesLiteral = JSON.stringify(platformRoutes, null, 2);
	const rootExternalLiteral = JSON.stringify(rootExternalRoutes, null, 2);
	const rootInternalLiteral = JSON.stringify(rootInternalRoutes, null, 2);

	return `/*
* AUTO-GENERATED Proxy.js
* Generated by scripts/generate-proxy.js
* DO NOT EDIT THIS FILE DIRECTLY — edit subdomains.json, your app folders, or script/generate-proxy.js instead.
*/

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const PLATFORM_ROUTES = ${routesLiteral};

export const ROOT_EXTERNAL_ROUTES = ${rootExternalLiteral};
export const ROOT_INTERNAL_ROUTES = ${rootInternalLiteral};

export const config = {
matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

function findPlatformRoutesForSubdomain(subdomain) {
return PLATFORM_ROUTES.find((p) => p.subdomain === subdomain) || { subdomain, externalRoutes: [], internalRoutes: [] };
}

// ✅ Helper: clone a response while preserving cookies
function withCookies(baseResponse, newResponse) {
const cookies = baseResponse.cookies.getAll();
cookies.forEach((cookie) => {
newResponse.cookies.set(cookie);
});
return newResponse;
}

export async function proxy(req) {
const activeSession = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
const { pathname, origin } = req.nextUrl;
const url = new URL(req.url);
const hostname = req.headers.get("host") ?? "";
const subdomain = hostname?.split(".")[0];
const port = url.port;

const allowedDomains = [\`localhost:\${port}\`, "thesneakingoutclub.com"];
const isAllowedDomain = allowedDomains.some((domain) => hostname.includes(domain));
const isValidSubdomain = PLATFORM_ROUTES.some((d) => d.subdomain === subdomain);
const isNotSubDomain = !isValidSubdomain;

// create a base response that always sets the cookie
const baseResponse = NextResponse.next();
baseResponse.cookies.set("current_subdomain", isNotSubDomain ? "members" : subdomain, {
path: "/",
httpOnly: false, // readable on client side
secure: process.env.NODE_ENV === "production",
sameSite: "lax"
});
 
if (isAllowedDomain && isNotSubDomain) {
const isInternalRoute = ROOT_INTERNAL_ROUTES.some((r) => pathname.includes(r));
const isExternalRoute = ROOT_EXTERNAL_ROUTES.some((r) => pathname === "/" || pathname.includes(r));

if (!activeSession) {
if (isInternalRoute) return withCookies(baseResponse, NextResponse.redirect(new URL("/login", origin)));
if (isExternalRoute) return baseResponse;
} else {
if (isExternalRoute) return withCookies(baseResponse, NextResponse.redirect(new URL("/dashboard", origin)));
if (isInternalRoute) return baseResponse;
}
}

if (isValidSubdomain) {
const platformRoutes = findPlatformRoutesForSubdomain(subdomain);
const { externalRoutes = [], internalRoutes = [] } = platformRoutes;

const isInternalRoute = internalRoutes.some((r) => pathname.includes(r));
const isExternalRoute = externalRoutes.some((r) => pathname === "/" || pathname.includes(r));

if (!activeSession) {
if (subdomain === "admin") {
if (pathname !== "/") return withCookies(baseResponse, NextResponse.redirect(new URL("/", origin)));
if (pathname === "/" || isExternalRoute) return withCookies(baseResponse, NextResponse.rewrite(new URL(\`/\${subdomain}\${url.pathname}\`, req.url)));
}
if (isInternalRoute) return withCookies(baseResponse, NextResponse.redirect(new URL("/login", origin)));
if (isExternalRoute) return withCookies(baseResponse, NextResponse.rewrite(new URL(\`/\${subdomain}\${url.pathname}\`, req.url)));
}

if (activeSession) {
if (subdomain === "admin") {
if (pathname === "/" || isExternalRoute) return withCookies(baseResponse, NextResponse.redirect(new URL("/dashboard", origin)));
if (isInternalRoute) return withCookies(baseResponse, NextResponse.rewrite(new URL(\`/\${subdomain}\${url.pathname}\`, req.url)));
}

if (subdomain === "partners") {
if (isExternalRoute) return withCookies(baseResponse, NextResponse.redirect(new URL("/dashboard", origin)));
if (activeSession.accountType === "retail account" && isInternalRoute) return withCookies(baseResponse, NextResponse.rewrite(new URL(\`/\${subdomain}/retail-account\${url.pathname}\`, req.url)));
if (activeSession.accountType === "service account" && isInternalRoute) return withCookies(baseResponse, NextResponse.rewrite(new URL(\`/\${subdomain}/service-account\${url.pathname}\`, req.url)));
if (activeSession.accountType === "content account" && isInternalRoute) return withCookies(baseResponse, NextResponse.rewrite(new URL(\`/\${subdomain}/content-account\${url.pathname}\`, req.url)));
}

if (isExternalRoute) return withCookies(baseResponse, NextResponse.redirect(new URL("/dashboard", origin)));
if (isInternalRoute) return withCookies(baseResponse, NextResponse.rewrite(new URL(\`/\${subdomain}\${url.pathname}\`, req.url)));
}
}

//Default fallback: always return cookie-enabled response
return baseResponse;
}
`;
}

async function buildAndWriteMiddleware() {
	try {
		const routes = await buildPlatformRoutes();
		const content = generateMiddlewareContent(routes);
		const newHash = sha256(content);

		let oldHash = null;
		if (fs.existsSync(OUTPUT_MIDDLEWARE)) {
			const prev = await fsp.readFile(OUTPUT_MIDDLEWARE, "utf8");
			oldHash = sha256(prev);
		}

		if (newHash !== oldHash) {
			await fsp.writeFile(OUTPUT_MIDDLEWARE, content, "utf8");
			console.log(`[generate-proxy] ✅ proxy.js updated at ${OUTPUT_MIDDLEWARE}`);
		} else {
			console.log(`[generate-proxy] ⚙️  No changes detected — skipped write`);
		}
	} catch (err) {
		console.error("[generate-proxy] ❌ Error building proxy:", err);
	}
}

async function startWatcher() {
	console.log("[generate-proxy] Starting watcher...");
	await buildAndWriteMiddleware();

	chokidar.watch(SUBDOMAINS_JSON, { persistent: true, ignoreInitial: true }).on("change", () => {
		debounce(async () => {
			console.log("[generate-proxy] subdomains.json changed — rebuilding...");
			await buildAndWriteMiddleware();
		});
	});

	chokidar
		.watch(`${APP_DIR}/**/*`, {
			persistent: true,
			ignoreInitial: true,
			ignored: (p) => EXCLUDED_FOLDERS.some((ex) => p.includes(`${path.sep}${ex}${path.sep}`) || p.endsWith(`${path.sep}${ex}`)),
			depth: 5
		})
		.on("all", (event, filePath) => {
			if (filePath.includes("external-section") || filePath.includes("(external-section)") || filePath.includes("internal-section") || filePath.includes("(internal-section)")) {
				debounce(async () => {
					console.log(`[generate-proxy] ${event}: ${filePath} — rebuilding middleware.js`);
					await buildAndWriteMiddleware();
				});
			}
		});

	console.log("[generate-proxy] Watching for changes...");
}

async function cli() {
	const args = process.argv.slice(2);
	const runOnce = args.includes("--once");
	if (runOnce) {
		console.log("[generate-proxy] Running once (--once)...");
		await buildAndWriteMiddleware();
		process.exit(0);
	} else {
		await startWatcher();
	}
}

cli().catch((err) => {
	console.error("[generate-proxy] Fatal error:", err);
	process.exit(1);
});

export { buildAndWriteMiddleware, startWatcher, collectRoutesForSubdomain };
