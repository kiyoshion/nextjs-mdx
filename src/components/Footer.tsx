import Image from "next/image";

export default function Footer() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <nav className='mt-20 backdrop-blur-sm bg-white/75'>
      <div className='max-w-7xl mx-auto flex items-bottom justify-between p-4 text-sm'>
        <div className=''>
          <div className='flex items-center mb-2'>
            <a href='https://github.com/kiyoshion' target='_blank' rel='noopener noreferrer' className='block mr-4 hover:opacity-80 duration-75'>
              <Image
                src='/img/svg/github.svg'
                width={24}
                height={24}
                alt='github'
              />
            </a>
            <a href='https://twitter.com/kiyoshion' target='_blank' rel='noopener noreferrer' className='block mr-4 hover:opacity-80 duration-75'>
              <Image
                src='/img/svg/twitter.svg'
                width={26}
                height={26}
                alt='twitter'
              />
            </a>
            <a href='mailto:kiyoshion@gmail.com' target='_blank' rel='noopener noreferrer' className='block mr-2 hover:opacity-80 duration-75'>
              <Image
                src='/img/svg/envelope.svg'
                width={26}
                height={26}
                alt='mail'
              />
            </a>
          </div>
          <span className='text-xs'>&copy; Kiyoshi Onoda</span>
        </div>
        <div className='flex items-center justify-start'>
          <div>
            <button className='buttonHoverUp' onClick={scrollTop}>
              <Image
                src='/img/svg/arrow-up.svg'
                width={20}
                height={20}
                alt='top'
                className=''
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
