import 'i18next'
import { defaultNS, resources } from '../i18n/i18n'

declare module 'i18next' {
  // kế thừa (thêm vào type)
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS // kiểu của defaultNS
    resources: (typeof resources)['vi'] // kiểu của resources['vi']
  }
}
