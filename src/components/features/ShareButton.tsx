import React, { useState } from 'react'
import { Button } from '../ui/Button'
import Icon from '../common/Icon_1'
import { cn } from '../../utils/helpers'

interface ShareButtonProps {
  url?: string
  title?: string
  artist?: string
  className?: string
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  url = window.location.href,
  title = 'Chia sẻ bài hát',
  artist = '',
  className
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareText = `${title}${artist ? ` - ${artist}` : ''}`
  const encodedText = encodeURIComponent(shareText)
  const encodedUrl = encodeURIComponent(url)

  const shareOptions = [
    {
      name: 'Facebook',
      icon: 'facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      color: 'hover:bg-blue-600'
    },
    {
      name: 'Twitter',
      icon: 'twitter',
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: 'hover:bg-blue-400'
    },
    {
      name: 'WhatsApp',
      icon: 'whatsapp',
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      color: 'hover:bg-green-600'
    },
    {
      name: 'Telegram',
      icon: 'telegram',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      color: 'hover:bg-blue-500'
    }
  ]

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400')
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <Button variant='ghost' size='sm' onClick={() => setIsOpen(true)} className={className}>
        <Icon name='share' />
        Chia sẻ
      </Button>
    )
  }

  return (
    <div className='relative'>
      {/* Backdrop */}
      <div className='fixed inset-0 bg-black/30 bg-opacity-50 z-40' onClick={() => setIsOpen(false)} />

      {/* Share Panel */}
      <div className='absolute top-0 left-0 bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-4 min-w-[280px] z-100'>
        <div className='flex items-center justify-between mb-4'>
          <button onClick={() => setIsOpen(false)} className='text-gray-400 hover:text-white transition-colors'>
            <Icon name='close' size={20} />
          </button>
          <h3 className='text-white font-medium'>Chia sẻ bài hát</h3>
        </div>

        {/* Share Options */}
        <div className='space-y-2 mb-4'>
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => handleShare(option.url)}
              className={cn(
                'w-full flex items-center gap-3 p-3 rounded-lg transition-colors',
                'bg-gray-700 hover:bg-gray-600 text-white',
                option.color
              )}
            >
              <Icon name={option.icon} size={20} />
              <span>{option.name}</span>
            </button>
          ))}
        </div>

        {/* Copy Link */}
        <div className='border-t border-gray-700 pt-4'>
          <div className='flex items-center gap-2'>
            <input
              type='text'
              value={url}
              readOnly
              className='flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white'
            />
            <Button variant='secondary' size='sm' onClick={handleCopyLink}>
              <Icon name={copied ? 'check' : 'copy'} size={16} />
              {copied ? 'Đã sao chép' : 'Sao chép'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
