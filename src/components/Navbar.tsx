import Link from "next/link";

export default function Navbar() {
  return (
    <nav className='sticky top-0 z-50 backdrop-blur-sm bg-white/75'>
      <div className='max-w-7xl mx-auto flex items-center justify-between p-4'>
        <div>
          <Link href='/'>Chic Hack</Link>
        </div>
        <div className='flex items-center justify-start'>
          <div>
            <Link href='/tours'>Tours</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
