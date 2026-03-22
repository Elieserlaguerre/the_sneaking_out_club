// generate-subdomains.js
import chokidar from "chokidar";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PLATFORM_INFRASTRUCTURE } from "./platform-infrastructure.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Always write subdomains.json to the project root
const outputPath = path.resolve(__dirname, "../subdomains.json");

function generateSubdomains() {
	console.log("🔄 Regenerating subdomains.json...");
	try {
		const subdomains = [];

		for (const section of PLATFORM_INFRASTRUCTURE) {
			for (const item of section.list) {
				if (item.subdomain && item.subdomain.trim() !== "") {
					subdomains.push({ subdomain: item.subdomain });
				}
			}
		}

		subdomains.sort((a, b) => a.subdomain.localeCompare(b.subdomain));

		fs.writeFileSync(outputPath, JSON.stringify(subdomains, null, 2), "utf-8");
		console.log(`✅ subdomains.json updated with ${subdomains.length} entries.`);
	} catch (err) {
		console.error("❌ Error generating subdomains:", err);
	}
}

// ✅ Initial run
generateSubdomains();

// ✅ Watch for updates to platform-infrastructure.js
const infraPath = path.resolve(__dirname, "./platform-infrastructure.js");
const watcher = chokidar.watch(infraPath, { persistent: true });

watcher.on("change", async (changedPath) => {
	console.log(`📁 Detected change in: ${changedPath}`);

	try {
		// ✅ Dynamically reload updated data
		const mod = await import(`./platform-infrastructure.js?update=${Date.now()}`);
		global.PLATFORM_INFRASTRUCTURE = mod.PLATFORM_INFRASTRUCTURE;
		generateSubdomains();
	} catch (err) {
		console.error("❌ Failed to reload PLATFORM_INFRASTRUCTURE:", err);
	}
});
