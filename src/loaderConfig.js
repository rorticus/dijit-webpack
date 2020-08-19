function getConfig(env) {
	// env is set by the 'buildEnvronment' and/or 'environment' plugin options (see webpack.config.js),
	// or by the code at the end of this file if using without webpack
	global.dojoConfig = {
		baseUrl: '.',
		packages: [
			{
				name: 'dojo',
				location: env.dojoRoot + '/dojo',
				lib: '.'
			},
			{
				name: 'dijit',
				location: env.dojoRoot + '/dijit',
				lib: '.'
			},
			{
				name: 'dojox',
				location: env.dojoRoot + '/dojox',
				lib: '.'
            }
        ],
        deps: ["src/demo/index"],

		paths: {
			demo: "./src/demo",
			theme: "theme",
			// With the webpack build, the css loader plugin is replaced by a webpack loader
			// via webpack.config.js, so the following are used only by the unpacked app.
			css: "//chuckdumont.github.io/dojo-css-plugin/1.0.0/css",
		},

		async: true,

		has: {'dojo-config-api': 0},	// We don't need the config API code in the embedded Dojo loader,
		                              // however, don't do this if you use window.dojoConfig or
		                              // require.rawConfig.

		fixupUrl: function(url) {
			// Load the uncompressed versions of dojo/dijit/dojox javascript files when using the dojo loader.
			// When using a webpack build, the dojo loader is not used for loading javascript files so this
			// property has no effect.  This is only needed because we're loading Dojo from a CDN for this
			// demo.  In a normal development envorinment, Dojo would be installed locally and this wouldn't
			// be needed.
			if (/\/(dojo|dijit|dojox)\/.*\.js$/.test(url)) {
			  url += ".uncompressed.js";
		  }
			return url;
		}
	};
	return dojoConfig;
}
// For Webpack, export the config.  This is needed both at build time and on the client at runtime
// for the packed application.
if (typeof module !== 'undefined' && module) {
	module.exports = getConfig;
} else {
	// No webpack.  This script was loaded by page via script tag, so load Dojo from CDN
	getConfig({dojoRoot: '//ajax.googleapis.com/ajax/libs/dojo/1.14.0'});
}
