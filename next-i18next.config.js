/** @type {import('next-i18next').UserConfig} */
module.exports = {
    debug: true,
    i18n: {
        locales: ['en', 'ja'], // Add the locales you want to support
        defaultLocale: 'en', // Set the default locale
        localeDetection: false,
    },
    reloadOnPrerender: true,
    // localePath: require('path').resolve('./public/locales'),
}