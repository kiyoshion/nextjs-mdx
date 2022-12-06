import Link from "next/link";

export default function Navbar() {
  return (
    <nav className='max-w-7xl mx-auto'>
      <div className='flex items-center justify-between p-4'>
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
