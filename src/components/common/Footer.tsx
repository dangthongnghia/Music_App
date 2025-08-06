import Icon from '../../components/common/Icon_1'
import { Link } from 'react-router-dom'
import i18n from '../../i18n/i18n'
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
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/jobs'>Jobs</Link>
            </li>
            <li>
              <Link to='/record'>For The Record</Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className='font-medium'>Communities</h1>
          <ul className='text-gray-500'>
            <li>
              <Link to='/about'>For Artists</Link>
            </li>
            <li>
              <Link to='/jobs'>Developers</Link>
            </li>
            <li>
              <Link to='/record'>Advertising</Link>
            </li>
            <li>
              <Link to=''>Investors</Link>
            </li>
            <li>
              <Link to=''>Vendors</Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className='font-medium'>Useful links</h1>
          <ul className='text-gray-500'>
            <li>
              <Link to=''>Support</Link>
            </li>
            <li>
              <Link to=''>Free Mobile Apps</Link>
            </li>
          </ul>
        </div>
        <div className='mt-5'>
          <ul className='flex gap-10 items-center justify-center'>
            <li className='text-sm  rounded-full bg-gray-600 p-2 hover:bg-gray-300 transition-colors'>
              <Icon name='facebook' size={20} />
            </li>
            <li className='text-sm  rounded-full bg-gray-600 p-2 hover:bg-gray-300 transition-colors'>
              <Icon name='twitter' size={20} />
            </li>
            <li className='text-sm  rounded-full bg-gray-600 p-2 hover:bg-gray-300 transition-colors'>
              <Icon name='instagram' size={20} />
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className='justify-between flex w-full items-center flex-col lg:flex-row mt-10'>
          <ul className=' flex flex-wrap gap-3 text-sm text-gray-500'>
            <li>
              <Link to=''>Legal</Link>
            </li>
            <li>
              <Link to=''>Safety & Privacy Center</Link>
            </li>
            <li>
              <a>Privacy Policy</a>
            </li>
            <li>
              <Link to=''>Cookies</Link>
            </li>
            <li>
              <Link to=''>About Ads</Link>
            </li>
            <li>
              <Link to=''>Accessibility</Link>
            </li>
          </ul>
          <p className=' text-center w-[50%]  text-gray-500 text-sm mt-4'>© 2025 MusicApp </p>
        </div>
      </div>
    </div>
  )
}
