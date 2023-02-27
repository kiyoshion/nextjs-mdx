import Link from "next/link";

export default function Navbar() {
  return (
    <nav className='sticky top-0 z-50 backdrop-blur-sm bg-white/75'>
      <div className='max-w-7xl mx-auto flex items-center justify-between p-4 text-sm'>
        <div>
          <Link href='/'>koLab</Link>
        </div>
        <div className='flex items-center justify-start'>
          <div>
            <Link className='px-2' href='/works'>works</Link>
          </div>
          <div>
            <Link className='px-2' href='/refs'>refs</Link>
          </div>
          <div>
            <Link className='px-2' href='/tours'>tours</Link>
          </div>
          <div>
            <Link className='px-2' href='/me'>me</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
