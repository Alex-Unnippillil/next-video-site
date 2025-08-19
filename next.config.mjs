import withNextIntl from 'next-intl/plugin';

const withIntl = withNextIntl('./i18n.ts');

export default withIntl({
  reactStrictMode: true
});
