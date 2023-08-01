import Layout from 'components/Layout';
import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CONSTS } from 'consts';

type WorkProps = {
  id: string;
  meta: {
    title: string;
    desc: string;
    launchedAt: number;
    thumb: string;
    tag: string;
    stacks: StackProps[];
    frameworks: FrameworkProps[];
    others: OtherProps[];
    server: string;
    intro: string;
  };
}

type FrameworkProps = {
  framework: string;
}

type StackProps = {
  stack: string;
}

type OtherProps = {
  other: string;
}

export const getStaticProps = () => {
  let tags: string[] = ['ALL'];
  const files = fs.readdirSync('src/pages/works/data');
  const works = files
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, '');
      const fileContent = fs.readFileSync(`src/pages/works/data/${fileName}`, 'utf-8');
      const { data } = matter(fileContent);
      tags.push(data.tag)

      return {
        id,
        meta: data,
      };
    });

  works.sort((a, b) => a.meta.launchedAt > b.meta.launchedAt ? -1 : 1)

  const newtags = Array.from(new Set(tags));

  return {
    props: {
      works,
      newtags
    },
  };
};

export default function Works({ works, newtags }: { works: WorkProps[], newtags: string[] }) {
  const [active, setActive] = useState('ALL')

  const RenderTags = () => {
    return (
      <div className='flex overflow-x-auto'>
        {newtags.map((tag: string) => (
          // eslint-disable-next-line react/jsx-key
          <span
            className={`flex-none py-1 md:px-4 px-2 text-xs mr-4 rounded-sm cursor-pointer hover:bg-gray-700 hover:text-white duration-75 ${active === tag ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}
            onClick={() => setActive(`${tag}`)}
          >{tag}</span>
        ))}
      </div>
    )
  }

  const TagRender = () => {
    return (
      <div className='flex overflow-x-auto'>
        <span
          className={`flex-none py-1 md:px-4 px-2 text-xs mr-4 rounded-sm cursor-pointer hover:bg-gray-700 hover:text-white duration-75 ${active === 'ALL' ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}
          onClick={() => setActive('ALL')}
        >ALL</span>
        <span
          className={`flex-none py-1 px-4 text-xs mr-4 rounded-sm cursor-pointer hover:bg-gray-700 hover:text-white duration-75 ${active === 'WEB SITE' ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}
          onClick={() => setActive('WEB SITE')}
        >WEB SITE</span>
        <span
          className={`flex-none py-1 px-4 text-xs mr-4 rounded-sm cursor-pointer hover:bg-gray-700 hover:text-white duration-75 ${active === 'WEB APP' ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}
          onClick={() => setActive('WEB APP')}
        >WEB APP</span>
        <span
          className={`flex-none py-1 px-4 text-xs mr-4 rounded-sm cursor-pointer hover:bg-gray-700 hover:text-white duration-75 ${active === 'APP' ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}
          onClick={() => setActive('CONCEPT APP')}
        >CONCEPT APP</span>
        <span
          className={`flex-none py-1 px-4 text-xs mr-4 rounded-sm cursor-pointer hover:bg-gray-700 hover:text-white duration-75 ${active === 'APP' ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}
          onClick={() => setActive('APP')}
        >APP</span>
      </div>
    )
  }

  return (
    <Layout
      meta={{
        title: "Kiyoshi Onoda's works",
        desc: 'Webエンジニア小野田の制作実績です。',
        image: `${CONSTS.HOST}/img/${works[0].meta.thumb}`,
        url: `${CONSTS.HOST}/works`
      }}
    >
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
              <h1 className='hover:opacity-80 duration-100 align-top leading-3 text-2xl my-0'>works</h1>
            </Link>
          </div>
        </motion.div>
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 20, opacity: 0 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.3 }}
        >
          <RenderTags />
        </motion.div>
      </div>

      <motion.div
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 15, opacity: 0 }}
        exit={{ y: 15, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.4 }}
      >
        <div className='max-w-7xl mx-auto text-sm sm:flex sm:justify-start flex-wrap'>
          {works.map((work: WorkProps) => (
            (active === 'ALL' || active === work.meta.tag) &&
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className='sm:w-1/3 w-full sm:mx-0 mx-auto my-4 block p-4'
              >
              <Link href={`/works/${work.id}`} key={work.id} className='hover:opacity-80 duration-75 block'>
                <Image
                  src={`/img/${work.meta.thumb}`}
                  width={600}
                  height={400}
                  alt={work.meta.title}
                  className='mb-2'
                />
                <div className='flex justify-between align-end'>
                  <h2 className='my-0'>{work.meta.title}</h2>
                  <span className='font-bold text-xl'>{work.meta.launchedAt.toString().slice(0, 4)}</span>
                </div>
                <span className='text-xs'>{work.meta.intro}</span>
              </Link>
              </motion.div>
          ))}
        </div>
        </motion.div>
      </motion.div>
    </Layout>
  )
}


