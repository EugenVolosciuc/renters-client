const withAntdLess = require('next-plugin-antd-less');

const customColors = {
    primaryColor: '#0F123F',
    highlightColor: '#F0776E',
    ghostWhite: '#F5F8FD'
}

/** @type {import('next').NextConfig} */
module.exports = withAntdLess({
    reactStrictMode: false,

    images: {
        domains: [
            'res.cloudinary.com'
        ]
    },

    // optional
    modifyVars: {
        '@primary-color': customColors.primaryColor,
        '@processing-color': customColors.primaryColor,
        '@highlight-color': customColors.highlightColor,
        '@body-background': customColors.ghostWhite,
        '@link-color': customColors.highlightColor,
        '@border-radius-base': '8px',
        '@form-item-margin-bottom': '20px',
        '@font-family': 'Karla'
    },
    // optional
    // lessVarsFilePath: './src/styles/variables.less',
    // optional
    // lessVarsFilePathAppendToEndOfContent: false,
    // optional https://github.com/webpack-contrib/css-loader#object
    // cssLoaderOptions: { },

    // webpack(config) {
    //     return config
    // }
})
