import { useState } from 'react'

import Icon from './Icon'

export default function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>()
  const [ishovered, setIsHovered] = useState<boolean>(false)
  return (
    <div
      className={`${isOpen ? 'w-[25%]' : 'w-[5%] '}  bg-black justify-between  text-white rounded-l-3xl shadow-lg  hidden`}
      onMouseEnter={() => setIsHovered(false)}
      onMouseLeave={() => setIsHovered(true)}
    >
      <div className=' h-4 justify-between items-center p-4 font-medium text-2xl mt-20 hidden md:flex'>
        <div>
          {isOpen ? (
            <p>Thư viện</p>
          ) : (
            <p className={` w-10 h-10 ${ishovered ? 'block' : 'hidden'}`}>
              <Icon name='library' />
            </p>
          )}
        </div>
        <p
          className={`w-10 h-10 ${ishovered ? ' hidden' : 'block items-end'} ${isOpen ? '' : 'rotate-180'}`}
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: 'pointer' }}
        >
          <Icon name='back' />
        </p>
      </div>
    </div>
  )
}
