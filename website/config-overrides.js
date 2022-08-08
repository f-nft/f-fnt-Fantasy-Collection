const webpack = require("webpack")

module.exports = function override(config, env) {
    //do stuff with the webpack config...
    config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
        crypto: require.resolve("crypto-browserify"),
        assert: require.resolve("assert"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify"),
        url: require.resolve("url"),
    }
    config.resolve.extensions = [
        ...config.resolve.extensions, ".ts", ".js", ".jsx"]
     config.ignoreWarnings = [/Failed to parse source map/]
    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
    ]
    return config
}