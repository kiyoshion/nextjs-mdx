/* eslint-disable react/no-unescaped-entities */
import Layout from 'components/Layout'
import Link from 'next/link'
import fs from 'fs';
import matter from 'gray-matter';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Card from 'components/Card';
import { CONSTS } from 'consts';

type WorkProps = {
  id: string;
  meta: {
    title: string;
    desc: string;
    launchedAt: number;
    thumb: string;
    tag: string;
    server: string;
    intro: string;
  };
}

type MemoProps = {
  id: string;
  meta: {
    title: string;
    createdAt: string;
    tags: string[];
  }
}

export const getStaticProps = () => {
  const files = fs.readdirSync('src/pages/works/data');
  const works = files
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, '');
      const fileContent = fs.readFileSync(`src/pages/works/data/${fileName}`, 'utf-8');
      const { data } = matter(fileContent);

      return {
        id,
        meta: data,
      };
    }
  );

  works.sort((a, b) => a.meta.launchedAt > b.meta.launchedAt ? -1 : 1)

  const memofiles = fs.readdirSync('src/pages/memos/data');
  const memos = memofiles
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, '');
      const memofileContent = fs.readFileSync(`src/pages/memos/data/${fileName}`, 'utf-8');
      const { data } = matter(memofileContent);
      return {
        id,
        meta: data,
      };
    });

  memos.sort((a, b) => a.meta.createdAt > b.meta.createdAt ? -1 : 1)

  return {
    props: {
      works,
      memos,
    },
  };

};


export default function Home({ works, memos }: { works: WorkProps[], memos: MemoProps[] }) {
  return (
    <Layout meta={{
      title: "Kiyoshi Onoda's portfolio",
      desc: 'Webエンジニア小野田のポートフォリオです。',
      image: `${CONSTS.HOST}/img/works/portfolio-top.jpg`,
      url: `${CONSTS.HOST}`
    }}>

      <motion.div
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 25, opacity: 0 }}
        exit={{ y: -25, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
      <h1 className='max-w-7xl mx-auto p-4 font-normal'>Kiyoshi Onoda<span className='ml-8 text-sm font-normal'>I'm a web engineer.</span></h1>

      <div className='max-w-7xl mx-auto p-4 flex flex-col'>
        <div className='buttonHover flex justify-between align-text-bottom transition-all ease-in-out'>
          <Link href='/works' className='text-2xl font-bold flex items-top my-2'>
            <span className='hover:opacity-80 duration-100 align-top leading-3'>works</span>
            <Image
              src='/img/svg/arrow-right1.svg'
              width={16}
              height={16}
              alt='arrow right'
              className='ml-2 align-bottom'
            />
          </Link>
        </div>
        <div className='max-w-7xl text-sm sm:flex sm:justify-start flex-wrap'>
          {works.map((work: WorkProps, i: number) => (
            (i < 3) &&
              <Link href={`/works/${work.id}`} key={work.id} className='hover:opacity-80 duration-200 block sm:max-w-1/3 sm:w-1/3 w-full sm:mx-0 mx-0 my-4 px-0 sm:pr-2'>
                <Image
                  src={`/img/${work.meta.thumb}`}
                  width={600}
                  height={400}
                  alt={work.meta.title}
                  className='mb-2 rounded-b-md border-2 border-slate-50'
                />
            </Link>
          ))}
        </div>
      </div>
      <div className='max-w-7xl mx-auto p-4 flex flex-col'>
        <div className='buttonHover flex justify-between align-text-bottom transition-all ease-in-out'>
            <Link href='/memos' className='text-2xl font-bold flex items-top my-2'>
              <span className='hover:opacity-80 duration-100 align-top leading-3'>memos</span>
              <Image
                src='/img/svg/arrow-right1.svg'
                width={16}
                height={16}
                alt='arrow right'
                className='ml-2 align-bottom'
              />
            </Link>
          </div>
        <div className='max-w-7xl text-sm sm:flex sm:justify-start flex-wrap'>
          {memos.map((memo: MemoProps, i: number) => (
            (i < 3) &&
              <Link href={`/memos/${memo.id}`} key={memo.id} className='hover:opacity-80 duration-200 block sm:max-w-1/3 sm:w-1/3 w-full sm:mx-0 mx-0 my-4 px-0 sm:pr-2'>
                <Card title={memo.meta.title} tags={memo.meta.tags} date={memo.meta.createdAt} />
            </Link>
          ))}
        </div>
      </div>
      </motion.div>
    </Layout>
  )
}

