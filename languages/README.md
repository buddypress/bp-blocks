# Translations management

1. You need to have [WP CLI](https://wp-cli.org/#installing) installed globally.
3. Use `npm run pot` to generate the POT file.
4. Translate into your language saving the file as buddypress-xx_XX.po/mo where xx_XX is your gettext locale.
5. Use `npm run po2json` to generate the JSON files.
6. Move these files into `/wp-content/languages/plugins/`.
7. Use `npm run build` to build the scripts.
