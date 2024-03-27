import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en-US.json'
import de from './locales/de-DE.json'
import ja from './locales/ja-JP.json'
import zh from './locales/zh-CN.json'


export const locales = [
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'de',
    name: 'Deutsch',
  },
  {
    code: 'ja',
    name: '日本語',
  },
  {
    code: 'zh',
    name: '简体中文',
  }]

i18next
  .use(initReactI18next)
  .init({
    fallbackLng: 'zh',
    debug: true,
    resources: {
      en: {
        translation: en
      },
      de: {
        translation: de
      },
      ja: {
        translation: ja
      },
      zh: {
        translation: zh
      },
    },
});
