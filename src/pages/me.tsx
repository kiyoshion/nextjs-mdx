/* eslint-disable react/no-unescaped-entities */
import Layout from "components/Layout";
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { CONSTS } from "consts";

export default function Me() {
  return (
    <Layout meta={{
      title: "Hello, I'm Kiyoshi Onoda.",
      desc: 'Webエンジニア小野田のポートフォリオです。',
      image: '/img/works/portflio-top.jpg',
      url: `${CONSTS.HOST}/me`
    }}>
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 100, opacity: 0 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <div className='max-w-7xl mx-auto p-4 text-sm flex flex-col'>
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 25, opacity: 0 }}
            exit={{ y: -25, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.2 }}
          >
            <div className='buttonHoverReverse flex justify-between align-text-bottom transition-all ease-in-out mb-4'>
              <Link href='/' className='text-2xl font-bold flex items-top my-2'>
                <Image
                  src='/img/svg/arrow-left1.svg'
                  width={16}
                  height={16}
                  alt='arrow left'
                  className='mr-2 align-bottom'
                />
                <h1 className='hover:opacity-80 duration-100 align-top leading-3 text-2xl my-0'>me</h1>
              </Link>
            </div>
            <div className='sm:flex sm:items-start sm:justify-between'>
              <p className='sm:w-1/2 w-full mr-8 my-4 leading-5'>I'm Kiyoshi Onoda. I work as a web engineer. I graduated and worked as a system enginner in Tokyo. Then, I used to build web sites as a freelance engineer. Recently I use PHP and JavaScript to develop web applications. I'm about to try Python these days.</p>
              <p className='sm:w-1/2 w-full my-4 leading-5'>Webエンジニアの小野田清です。大学卒業後、都内でSEとして働いていました。その後フリーランスでWebサイト制作。最近はPHPとJavaScriptでWebアプリを開発しています。近頃はPythonを始めそうです。</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
}
