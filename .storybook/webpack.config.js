const path = require("path");

module.exports = ({ config }) => {
    config.module.rules.push(
        {
            test: /\.(le|c)ss$/,
            use: [
                "classnames-loader",
                'style-loader',
                { loader: 'css-loader', options: { modules: true  } },
                'less-loader'
            ],
            include: [path.join(__dirname, "..", "src"), path.join(__dirname, "..", "stories")],
        },
        {
            test: /\.(ts|js)x?$/,
            use: ['babel-loader'],
            include: [path.join(__dirname, "..", "src"), path.join(__dirname, "..", "stories")],
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                },
            ],
            include: [path.join(__dirname, "..", "src"), path.join(__dirname, "..", "stories")],
        },
    );
    config.resolve.extensions = ['.js', '.jsx', '.json', '.ts', '.tsx'];
    return config;
};