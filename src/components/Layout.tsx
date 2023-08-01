import Head from 'next/head'
import Navbar from './Navbar';
import Footer from './Footer';
import { CONSTS } from '../consts'

export default function Layout({ children, meta }: { children: any, meta: any }) {
  return (
    <div>
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{`${meta.title} - ${CONSTS.APP_NAME}`}</title>
        <meta name="description" content={meta.desc} />
        <meta key='ogTitle' property='og:title' content={`${meta.title} - ${CONSTS.APP_NAME}`} />
        <meta key='ogDescription' property='og:description' content={meta.desc} />
        <meta key='ogUrl' property='og:url' content={meta.url} />
        <meta key='ogType' property='og:type' content='article' />
        <meta key='ogImage' property='og:image' content={meta.image} />
        <meta key='ogSiteName' property='og:site_name' content={CONSTS.APP_NAME} />

        {/* Twitter */}
        <meta key='twitterSite' name='twitter:site' content='@kiyoshion' />
        <meta key='twitterCard' name='twitter:card' content='summary_large_image' />
        <meta key='twitterDomain' name='twitter:domain' content={CONSTS.HOST} />
        <meta key='twitterTitle' name='twitter:title' content={`${meta.title} - ${CONSTS.APP_NAME}`} />
        <meta key='twitterImage' name='twitter:image' content={meta.image} />
        <meta key='twitterDescription' name='twitter:description' content={meta.desc} />
      </Head>

      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
