const locales = {
    en: {
        label: "english",
        tag: "en"
    },
    ro: { // Romanian has 3 plural forms: https://github.com/i18next/i18next/issues/1579
        label: "romanian",
        tag: "ro"
    }
}

module.exports = {
    locales,
    i18n: {
        defaultLocale: locales.en.tag,
        locales: [locales.en.tag, locales.ro.tag]
    },
}