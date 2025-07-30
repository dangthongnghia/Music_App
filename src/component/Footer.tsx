import Icon from './Icon'
import { Link } from 'react-router-dom'
import i18n from '../i18n/i18n'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation('translation', { i18n })
  return (
    <div>
      <div className=' grid grid-cols-2 lg:grid-cols-4 justify-between border-t-1  py-5 border-y-1  h-full '>
        <div>
          <h1 className=' font-medium'>{t('footer.Company')}</h1>
          <ul className='text-gray-500'>
            <li>
              <Link to='/about'>{t('footer.About')}</Link>
            </li>
            <li>
              <Link to='/jobs'>{t('footer.Jobs')}</Link>
            </li>
            <li>
              <Link to='/record'>{t('footer.For The Record')}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className='font-medium'>{t('footer.Communities')}</h1>
          <ul className='text-gray-500'>
            <li>
              <Link to='/about'>{t('footer.For Artists')}</Link>
            </li>
            <li>
              <Link to='/jobs'>{t('footer.Developers')}</Link>
            </li>
            <li>
              <Link to='/record'>{t('footer.Advertising')}</Link>
            </li>
            <li>
              <Link to=''>{t('footer.Investors')}</Link>
            </li>
            <li>
              <Link to=''>{t('footer.Vendors')}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className='font-medium'>{t('footer.Useful links')}</h1>
          <ul className='text-gray-500'>
            <li>
              <Link to=''>{t('footer.Support')}</Link>
            </li>
            <li>
              <Link to=''> {t('footer.Free Mobile Apps')}</Link>
            </li>
          </ul>
        </div>
        <div className='mt-5'>
          <ul className='flex gap-10 items-center justify-center'>
            <li className='text-sm  rounded-full bg-gray-600 p-2 hover:bg-gray-300 transition-colors'>
              <Icon name='facebook' />
            </li>
            <li className='text-sm  rounded-full bg-gray-600 p-2 hover:bg-gray-300 transition-colors'>
              <Icon name='twitter' />
            </li>
            <li className='text-sm  rounded-full bg-gray-600 p-2 hover:bg-gray-300 transition-colors'>
              <Icon name='instagram' />
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className='justify-between flex w-full items-center flex-col lg:flex-row mt-10'>
          <ul className=' flex flex-wrap gap-3 text-sm text-gray-500'>
            <li>
              <a>{t('footer.Legal')}</a>
            </li>
            <li>
              <a>{t('footer.Safety & Privacy Center')}</a>
            </li>
            <li>
              <a>{t('footer.Privacy Policy')}</a>
            </li>
            <li>
              <a href=''>{t('footer.Cookies')}</a>
            </li>
            <li>
              <a>{t('footer.About Ads')}</a>
            </li>
            <li>
              <a href=''>{t('footer.Accessibility')}</a>
            </li>
          </ul>
          <p className=' text-center w-[50%]  text-gray-500 text-sm mt-4'>© 2025 MusicApp </p>
        </div>
      </div>
    </div>
  )
}
