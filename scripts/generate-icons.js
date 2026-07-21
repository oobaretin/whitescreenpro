/**
 * Generate PWA icons. Delegates to the Python stdlib script (no npm deps).
 * Run: npm run icons
 */
const { execSync } = require("child_process");
const path = require("path");

execSync(`python3 "${path.join(__dirname, "generate-icons.py")}"`, {
  stdio: "inherit",
});
