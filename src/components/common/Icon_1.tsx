type IconProps = {
  name: string
  className?: string
  size?: number
}

function Icon(props: IconProps) {
  const { name, className, size = 24 } = props

  // Music Player Icons
  if (name === 'play') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M8 5v14l11-7z' />
      </svg>
    )
  } else if (name === 'pause') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
      </svg>
    )
  } else if (name === 'prev') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M6 6h2v12H6zm3.5 6l8.5 6V6z' />
      </svg>
    )
  } else if (name === 'next') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z' />
      </svg>
    )
  } else if (name === 'shuffle') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z' />
      </svg>
    )
  } else if (name === 'repeat') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z' />
      </svg>
    )
  } else if (name === 'volume') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z' />
      </svg>
    )
  } else if (name === 'volume-mute') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <polygon points='11 5 6 9 2 9 2 15 6 15 11 19 11 5' />
        <line x1='23' y1='9' x2='17' y2='15' />
        <line x1='17' y1='9' x2='23' y2='15' />
      </svg>
    )
  }

  // Navigation Icons
  else if (name === 'home') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
      </svg>
    )
  } else if (name === 'search') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <circle cx='11' cy='11' r='8' />
        <path d='m21 21-4.35-4.35' />
      </svg>
    )
  } else if (name === 'library') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM18 14H10V6h8v8z' />
        <path d='M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z' />
      </svg>
    )
  } else if (name === 'menu') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <line x1='4' y1='6' x2='20' y2='6' />
        <line x1='4' y1='12' x2='20' y2='12' />
        <line x1='4' y1='18' x2='20' y2='18' />
      </svg>
    )
  } else if (name === 'close') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <line x1='18' y1='6' x2='6' y2='18' />
        <line x1='6' y1='6' x2='18' y2='18' />
      </svg>
    )
  } else if (name === 'back') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='m12 19-7-7 7-7' />
        <path d='M19 12H5' />
      </svg>
    )
  }

  // Action Icons
  else if (name === 'heart') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path
          d='M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z'
          stroke='#ffffff'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></path>
      </svg>
    )
  } else if (name === 'heart-filled') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path
          d='M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z'
          fill='#e00000'
        ></path>
      </svg>
    )
  } else if (name === 'share') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <circle cx='18' cy='5' r='3' />
        <circle cx='6' cy='12' r='3' />
        <circle cx='18' cy='19' r='3' />
        <line x1='8.59' y1='13.51' x2='15.42' y2='17.49' />
        <line x1='15.41' y1='6.51' x2='8.59' y2='10.49' />
      </svg>
    )
  } else if (name === 'more') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <circle cx='12' cy='12' r='1' />
        <circle cx='19' cy='12' r='1' />
        <circle cx='5' cy='12' r='1' />
      </svg>
    )
  } else if (name === 'download') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
        <polyline points='7,10 12,15 17,10' />
        <line x1='12' y1='15' x2='12' y2='3' />
      </svg>
    )
  }

  // Social Media Icons
  else if (name === 'facebook') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
      </svg>
    )
  } else if (name === 'twitter') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
      </svg>
    )
  } else if (name === 'whatsapp') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.488' />
      </svg>
    )
  } else if (name === 'telegram') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
      </svg>
    )
  }

  // Utility Icons
  else if (name === 'copy') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <rect x='9' y='9' width='13' height='13' rx='2' ry='2' />
        <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
      </svg>
    )
  } else if (name === 'check') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <polyline points='20,6 9,17 4,12' />
      </svg>
    )
  } else if (name === 'expand') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <polyline points='15,3 21,3 21,9' />
        <polyline points='9,21 3,21 3,15' />
        <line x1='21' y1='3' x2='14' y2='10' />
        <line x1='3' y1='21' x2='10' y2='14' />
      </svg>
    )
  }

  // Music Related Icons
  else if (name === 'music') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M9 18V5l12-2v13' />
        <circle cx='6' cy='18' r='3' />
        <circle cx='18' cy='16' r='3' />
      </svg>
    )
  } else if (name === 'album') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z' />
      </svg>
    )
  } else if (name === 'playlist') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M21 15V6' />
        <path d='M15 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
        <path d='M5 12V4' />
        <path d='M3 6h4' />
        <path d='M3 10h2' />
      </svg>
    )
  } else if (name === 'lyric') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
        <polyline points='14,2 14,8 20,8' />
        <line x1='16' y1='13' x2='8' y2='13' />
        <line x1='16' y1='17' x2='8' y2='17' />
        <polyline points='10,9 9,9 8,9' />
      </svg>
    )
  }

  // User & Profile Icons
  else if (name === 'user') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
        <circle cx='12' cy='7' r='4' />
      </svg>
    )
  } else if (name === 'settings') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <circle cx='12' cy='12' r='3' />
        <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z' />
      </svg>
    )
  }

  // Miscellaneous Icons
  else if (name === 'star') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <polygon points='12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26' />
      </svg>
    )
  } else if (name === 'trophy') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M6 9H4.5a2.5 2.5 0 0 1 0-5H6' />
        <path d='M18 9h1.5a2.5 2.5 0 0 0 0-5H18' />
        <path d='M4 22h16' />
        <path d='M10 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34' />
        <path d='M18 2H6v7a6 6 0 0 0 12 0V2z' />
      </svg>
    )
  } else if (name === 'fire') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path d='M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z' />
      </svg>
    )
  } else if (name === 'verified') {
    return (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M9.5924 3.20027C9.34888 3.4078 9.22711 3.51158 9.09706 3.59874C8.79896 3.79854 8.46417 3.93721 8.1121 4.00672C7.95851 4.03705 7.79903 4.04977 7.48008 4.07522C6.6787 4.13918 6.278 4.17115 5.94371 4.28923C5.17051 4.56233 4.56233 5.17051 4.28923 5.94371C4.17115 6.278 4.13918 6.6787 4.07522 7.48008C4.04977 7.79903 4.03705 7.95851 4.00672 8.1121C3.93721 8.46417 3.79854 8.79896 3.59874 9.09706C3.51158 9.22711 3.40781 9.34887 3.20027 9.5924C2.67883 10.2043 2.4181 10.5102 2.26522 10.8301C1.91159 11.57 1.91159 12.43 2.26522 13.1699C2.41811 13.4898 2.67883 13.7957 3.20027 14.4076C3.40778 14.6511 3.51158 14.7729 3.59874 14.9029C3.79854 15.201 3.93721 15.5358 4.00672 15.8879C4.03705 16.0415 4.04977 16.201 4.07522 16.5199C4.13918 17.3213 4.17115 17.722 4.28923 18.0563C4.56233 18.8295 5.17051 19.4377 5.94371 19.7108C6.278 19.8288 6.6787 19.8608 7.48008 19.9248C7.79903 19.9502 7.95851 19.963 8.1121 19.9933C8.46417 20.0628 8.79896 20.2015 9.09706 20.4013C9.22711 20.4884 9.34887 20.5922 9.5924 20.7997C10.2043 21.3212 10.5102 21.5819 10.8301 21.7348C11.57 22.0884 12.43 22.0884 13.1699 21.7348C13.4898 21.5819 13.7957 21.3212 14.4076 20.7997C14.6511 20.5922 14.7729 20.4884 14.9029 20.4013C15.201 20.2015 15.5358 20.0628 15.8879 19.9933C16.0415 19.963 16.201 19.9502 16.5199 19.9248C17.3213 19.8608 17.722 19.8288 18.0563 19.7108C18.8295 19.4377 19.4377 18.8295 19.7108 18.0563C19.8288 17.722 19.8608 17.3213 19.9248 16.5199C19.9502 16.201 19.963 16.0415 19.9933 15.8879C20.0628 15.5358 20.2015 15.201 20.4013 14.9029C20.4884 14.7729 20.5922 14.6511 20.7997 14.4076C21.3212 13.7957 21.5819 13.4898 21.7348 13.1699C22.0884 12.43 22.0884 11.57 21.7348 10.8301C21.5819 10.5102 21.3212 10.2043 20.7997 9.5924C20.5922 9.34887 20.4884 9.22711 20.4013 9.09706C20.2015 8.79896 20.0628 8.46417 19.9933 8.1121C19.963 7.95851 19.9502 7.79903 19.9248 7.48008C19.8608 6.6787 19.8288 6.278 19.7108 5.94371C19.4377 5.17051 18.8295 4.56233 18.0563 4.28923C17.722 4.17115 17.3213 4.13918 16.5199 4.07522C16.201 4.04977 16.0415 4.03705 15.8879 4.00672C15.5358 3.93721 15.201 3.79854 14.9029 3.59874C14.7729 3.51158 14.6511 3.40781 14.4076 3.20027C13.7957 2.67883 13.4898 2.41811 13.1699 2.26522C12.43 1.91159 11.57 1.91159 10.8301 2.26522C10.5102 2.4181 10.2043 2.67883 9.5924 3.20027ZM16.3735 9.86314C16.6913 9.5453 16.6913 9.03 16.3735 8.71216C16.0557 8.39433 15.5403 8.39433 15.2225 8.71216L10.3723 13.5624L8.77746 11.9676C8.45963 11.6498 7.94432 11.6498 7.62649 11.9676C7.30866 12.2854 7.30866 12.8007 7.62649 13.1186L9.79678 15.2889C10.1146 15.6067 10.6299 15.6067 10.9478 15.2889L16.3735 9.86314Z'
          fill='#003cff'
        ></path>
      </svg>
    )
  } else if (props.name === 'arrow-right') {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='#ffffff'
        height={size}
        viewBox='0 0 320 512'
        width={size}
        className={className}
      >
        <path d='M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z'></path>
      </svg>
    )
  } else if (props.name === 'arrow-left') {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='#ffffff'
        height={size}
        width={size}
        className={className}
        viewBox='0 0 320 512'
      >
        <path d='M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256l138.3-138.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z'></path>
      </svg>
    )
  } else if (props.name === 'logout') {
    return (
      <svg
        width={size}
        height={size}
        className={className}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
          {' '}
          <path
            d='M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5'
            stroke='#ffffff'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          ></path>{' '}
        </g>
      </svg>
    )
  } else if (props.name === 'chevron-down') {
    return (
      <svg
        fill='#ffffff'
        height={size}
        width={size}
        className={className}
        version='1.1'
        baseProfile='tiny'
        id='Layer_1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        viewBox='0 0 42 42'
        transform='rotate(90)'
      >
        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
        <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
          <polygon
            fillRule='evenodd'
            points='13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 '
          ></polygon>
        </g>
      </svg>
    )
  } else if (props.name === 'list') {
    return (
      <svg
        width={size}
        height={size}
        className={className}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
        <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
          {' '}
          <path d='M20 7L4 7' stroke='#ffffff' strokeWidth='1.5' strokeLinecap='round'></path>{' '}
          <path d='M15 12L4 12' stroke='#ffffff' strokeWidth='1.5' strokeLinecap='round'></path>{' '}
          <path d='M9 17H4' stroke='#ffffff' strokeWidth='1.5' strokeLinecap='round'></path>{' '}
        </g>
      </svg>
    )
  } else if (props.name === 'text') {
    return (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        className={className}
      >
        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
        <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
          {' '}
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M12.9 18.5C11.8795 18.4769 11.0687 17.6349 11.0842 16.6142C11.0997 15.5936 11.9356 14.7766 12.9563 14.7845C13.9771 14.7924 14.8003 15.6222 14.8 16.643C14.7947 17.1413 14.5915 17.6171 14.2351 17.9654C13.8786 18.3138 13.3983 18.5061 12.9 18.5V18.5Z'
            stroke='#ffffff'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>{' '}
          <path
            d='M5 5.75003C4.58579 5.75003 4.25 6.08581 4.25 6.50003C4.25 6.91424 4.58579 7.25003 5 7.25003V5.75003ZM12 7.25003C12.4142 7.25003 12.75 6.91424 12.75 6.50003C12.75 6.08581 12.4142 5.75003 12 5.75003V7.25003ZM5 8.75003C4.58579 8.75003 4.25 9.08581 4.25 9.50003C4.25 9.91424 4.58579 10.25 5 10.25V8.75003ZM10 10.25C10.4142 10.25 10.75 9.91424 10.75 9.50003C10.75 9.08581 10.4142 8.75003 10 8.75003V10.25ZM5 11.75C4.58579 11.75 4.25 12.0858 4.25 12.5C4.25 12.9142 4.58579 13.25 5 13.25V11.75ZM8 13.25C8.41421 13.25 8.75 12.9142 8.75 12.5C8.75 12.0858 8.41421 11.75 8 11.75V13.25ZM14.042 16.643C14.042 17.0572 14.3778 17.393 14.792 17.393C15.2062 17.393 15.542 17.0572 15.542 16.643H14.042ZM15.542 9.50003C15.542 9.08581 15.2062 8.75003 14.792 8.75003C14.3778 8.75003 14.042 9.08581 14.042 9.50003H15.542ZM14.792 9.50003H14.042C14.042 9.71214 14.1318 9.91433 14.2892 10.0565C14.4466 10.1987 14.6568 10.2676 14.8679 10.2462L14.792 9.50003ZM14.792 8.21403H15.542C15.542 8.20559 15.5419 8.19716 15.5416 8.18873L14.792 8.21403ZM15.2992 6.96175L14.7786 6.42194V6.42194L15.2992 6.96175ZM16.569 6.50003L16.5167 7.2482C16.5341 7.24942 16.5515 7.25003 16.569 7.25003V6.50003ZM17.6 6.50003V7.25011L17.6115 7.24994L17.6 6.50003ZM19 7.85403L19.7499 7.8661C19.75 7.85757 19.75 7.84904 19.7499 7.84052L19 7.85403ZM17.743 9.20003L17.6797 8.45259L17.6671 8.45387L17.743 9.20003ZM5 7.25003H12V5.75003H5V7.25003ZM5 10.25H10V8.75003H5V10.25ZM5 13.25H8V11.75H5V13.25ZM15.542 16.643V9.50003H14.042V16.643H15.542ZM15.542 9.50003V8.21403H14.042V9.50003H15.542ZM15.5416 8.18873C15.5329 7.9306 15.634 7.68087 15.8199 7.50156L14.7786 6.42194C14.2869 6.89616 14.0194 7.55662 14.0424 8.23932L15.5416 8.18873ZM15.8199 7.50156C16.0058 7.32226 16.259 7.23018 16.5167 7.2482L16.6213 5.75185C15.9399 5.7042 15.2702 5.94771 14.7786 6.42194L15.8199 7.50156ZM16.569 7.25003H17.6V5.75003H16.569V7.25003ZM17.6115 7.24994C17.9582 7.2446 18.2439 7.52085 18.2501 7.86753L19.7499 7.84052C19.7287 6.66707 18.762 5.73205 17.5885 5.75011L17.6115 7.24994ZM18.2501 7.84195C18.2449 8.16176 17.9984 8.42572 17.6797 8.4527L17.8063 9.94735C18.8924 9.85541 19.7324 8.95593 19.7499 7.8661L18.2501 7.84195ZM17.6671 8.45387L14.7161 8.75387L14.8679 10.2462L17.8189 9.94618L17.6671 8.45387Z'
            fill='#ffffff'
          ></path>{' '}
        </g>
      </svg>
    )
  } else if (props.name === 'time') {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' fill='#ffffff' height={size} width={size} viewBox='0 0 512 512'>
        <path d='M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z'></path>
      </svg>
    )
  } else if (props.name === 'downarrow') {
    return (
      <svg
        fill='#FF0000'
        height={size}
        width={size}
        className={className}
        version='1.1'
        baseProfile='tiny'
        id='Layer_1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        viewBox='0 0 42 42'
        transform='rotate(90)'
      >
        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
        <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
          {' '}
          <polygon
            fillRule='evenodd'
            points='13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 '
          ></polygon>{' '}
        </g>
      </svg>
    )
  } else if (props.name === 'uparrow') {
    return (
      <svg
        fill='#00FF00'
        height={size}
        width={size}
        className={className}
        version='1.1'
        baseProfile='tiny'
        id='Layer_1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        viewBox='0 0 42 42'
        transform='rotate(270)'
      >
        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
        <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
          {' '}
          <polygon
            fillRule='evenodd'
            points='13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 '
          ></polygon>{' '}
        </g>
      </svg>
    )
  }

  // Default fallback icon
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <circle cx='12' cy='12' r='10' />
    </svg>
  )
}

export default Icon
