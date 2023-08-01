import Head from 'next/head'
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, meta }: { children: any, meta: any }) {
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.desc} />
      </Head>

      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
