type Messages = typeof import('../messages/en.json');
type PTMessages = typeof import('../messages/pt-PT.json');

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages, PTMessages {}
}
