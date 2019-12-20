const path = require('path')
// server side

module.exports = {
    mode: "development",
    entry: './client/index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader', //suport jsx
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react', ['@babel/preset-env']] //??
                }
            },
            {
                test:/\.css$/,
                use: [
                    "isomorphic-style-loader",
                    {
                        loader: 'css-loader',
                    }
                ]
            }
        ]
    }
}