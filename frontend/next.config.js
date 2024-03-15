
const withSerwist = require("@serwist/next").default({
	// Note: This is only an example. If you use Pages Router,
	// use something else that works, such as "service-worker/index.ts".
	swSrc: "app/sw.ts",
	swDest: "public/sw.js",
});

const nextConfig = {
	/* config options here */
};

module.exports = withSerwist({ nextConfig });
