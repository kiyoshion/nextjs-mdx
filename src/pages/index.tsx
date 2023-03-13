/* eslint-disable react/no-unescaped-entities */
import Layout from 'components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout meta={{
      title: 'Chic Hack',
      desc: 'How to develop any app?',
    }}>
      <h1 className='max-w-7xl mx-auto p-4'>more graphical, more interactive.</h1>
      <p className='max-w-7xl mx-auto p-4'>Let's improve yourself.</p>

      <div className='max-w-7xl mx-auto p-4'>
        <Link href='/works'>
          <div>
            <h2>Works</h2>
            <p>My works are here.</p>
          </div>
        </Link>
        <Link href='/tours'>
          <div>
            <h2>Tours</h2>
            <p>This is tutorial</p>
          </div>
        </Link>
      </div>
    </Layout>
  )
}
