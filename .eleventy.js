const beautify = require("js-beautify").html
const minify = require("html-minifier-terser").minify

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({
        "src/assets": "_assets",
        "src/assets/favicon.ico": "/favicon.ico",
    })

    // actual CSS processing happens standalone (see package.json), but we’ll watch the folder for changes
    eleventyConfig.addWatchTarget('./src/styles')

    // Compress HTML for prod
    if (process.env.ELEVENTY_ENV === "production") {
        eleventyConfig.addTransform("minify", async (content, path) => {
            return path.endsWith(".html")
                ? await minify(content, {
                        minifyJS: true,
                        minifyCSS: true,
                        removeAttributeQuotes: true,
                        removeScriptTypeAttributes : true,
                        removeStyleLinkTypeAttributes: true,
                        collapseWhitespace: true
                    })
                : content
        })
    }

    // Beautify HTML for dev
    else {
        eleventyConfig.addTransform("beautify", async (content, path) => {
            return path.endsWith(".html")
                ? beautify(content, { preserve_newlines: false })
                : content
        })
    }

    return {
        dir: {
            input: "src/pages",
            output: "dist",
            layouts: "../templates",
            includes: "../templates",
            data: "../data"
        },
        passthroughFileCopy: true,
        templateFormats: ["njk", "md", "html"],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    }
}
