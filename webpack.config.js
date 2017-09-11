var path = require('path')
var webpack = require('webpack')
var MultipageWebpackPlugin = require('multipage-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    context: __dirname,
    entry: {
        a: './src/js/a.js',
        b: './src/js/b.js',
        c: './src/js/c.js'
    },
    output: {
        filename: 'js/[name].chunk.js',
        path: resolve('./dist/')
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: resolve('./'),
            verbose: true,
            dry: false,
        }),
        new MultipageWebpackPlugin({
            // replace [name] in template path
            templateFilename: '[name].html',
            templatePath: 'html',
            htmlTemplatePath: resolve('./src/html/[name].html'),
            bootstrapFilename: 'js/inline.chunk.js',
            htmlWebpackPluginOptions: {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                }
            }
        })
    ]
}