const sharp = require("sharp");
const path = require("path");

const svgPath = path.join(__dirname, "../public/icon.svg");
const outputDir = path.join(__dirname, "../public");

async function generate() {
    try {
        const sizes = [96, 192, 512];
        for (const size of sizes) {
            const pngPath = path.join(outputDir, `icon-${size}x${size}.png`);
            await sharp(svgPath)
                .resize(size, size)
                .png()
                .toFile(pngPath);
            console.log(`Generated ${pngPath}`);

            // also generate maskable version (same dimensions)
            const maskPath = path.join(outputDir, `icon-maskable-${size}x${size}.png`);
            await sharp(svgPath)
                .resize(size, size)
                .png()
                .toFile(maskPath);
            console.log(`Generated ${maskPath}`);
        }
        console.log("All PWA icons created successfully.");
    } catch (err) {
        console.error("Error generating icons:", err);
        process.exit(1);
    }
}

generate();