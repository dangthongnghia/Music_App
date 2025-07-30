import Icon from './Icon'

export const shareButton = () => {
  const copyCurrentURL = () => {
    const currentURL = window.location.href
    navigator.clipboard.writeText(currentURL)
  }
  return (
    <div className=' inset-30 left-18 bg-white w-70 h-50 rounded-2xl text-black  items-center '>
      <h1 className='text-xl font-bold p-2'>Chia sẻ</h1>
      <div className='m-5  flex flex-col gap-2'>
        <span className='flex gap-2' onClick={copyCurrentURL}>
          <p className='w-5 h-5'>
            <Icon name='url' />
          </p>
          Sao chép liên kết
        </span>
        <span className='flex gap-2' onClick={copyCurrentURL}>
          <p className='w-7 h-7'>
            <Icon name='facebook_2' />
          </p>
          Facebook
        </span>
        <span className='flex gap-2' onClick={copyCurrentURL}>
          <p className='w-7 h-7'>
            <Icon name='zalo' />
          </p>
          Zalo
        </span>
      </div>
    </div>
  )
}
