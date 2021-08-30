const withAntdLess = require('next-plugin-antd-less');
const { i18n } = require('./next-i18next.config');

const customColors = {
    primaryColor: '#0F123F',
    highlightColor: '#F0776E',
    ghostWhite: '#F5F8FD'
}

/** @type {import('next').NextConfig} */
module.exports = withAntdLess({
    i18n,

    reactStrictMode: false,

    images: {
        domains: [
            'res.cloudinary.com'
        ]
    },

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
    // webpack(config) {
    //     return config
    // }
})
