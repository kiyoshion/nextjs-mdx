import Head from 'next/head'
import Navbar from './Navbar';

export default function Layout({ children, meta }: { children: any, meta: any }) {
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.desc} />
      </Head>

      <Navbar />

      <main className='max-w-2xl mx-auto'>{children}</main>
    </div>
  );
}
