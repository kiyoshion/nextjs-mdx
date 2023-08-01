import Layout from 'components/Layout';
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation'
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CONSTS } from 'consts';

type MemoProps = {
  id: string;
  meta: {
    title: string;
    desc: string;
    createdAt: string;
    tags: string[];
    img: string;
  };
}

export const getStaticProps = () => {
  let tags: string[] = ['ALL'];
  const files = fs.readdirSync('src/pages/memos/data');
  const memos = files.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, '');
    const fileContent = fs.readFileSync(`src/pages/memos/data/${fileName}`, 'utf-8');
    const { data } = matter(fileContent);
    tags.push(...data.tags)

    return {
      id,
      meta: data,
    };
  });

  memos.sort((a, b) => a.meta.createdAt > b.meta.createdAt ? -1 : 1)

  const newtags = Array.from(new Set(tags));

  return {
    props: {
      memos,
      newtags
    },
  };
};

export default function Memos({ memos, newtags }: { memos: MemoProps[], newtags: string[] }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const [active, setActive] = useState('ALL');
  console.log(name)

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

  return (
    <Layout
      meta={{
        title: "Kiyoshi Onoda's memos",
        desc: 'Webエンジニア小野田のメモです。',
        image: `${CONSTS.HOST}/img/${memos[0].meta.img}`,
        url: `${CONSTS.HOST}/memos`
      }}
    >
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 100, opacity: 0 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <div className='max-w-7xl mx-auto p-4 text-sm'>
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
                <h1 className='hover:opacity-80 duration-100 align-top leading-3 text-2xl my-0'>memos</h1>
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
          <div className='max-w-7xl mx-auto text-sm flex flex-col p-4'>
            {memos.map((memo: MemoProps) => (
              (active === 'ALL' || memo.meta.tags.includes(active)) &&
                <Link href={`/memos/${memo.id}`} key={memo.id} className='my-4 hover:opacity-80 duration-75'>
                  <div className='flex items-center mb-1'>
                    <p className='text-sm my-0 mr-2'>{memo.meta.createdAt}</p>
                    <div className='flex items-center'>
                      {memo.meta.tags.map((tag: string) => (
                        <Image
                          key={tag}
                          src={`/img/svg/${tag}.svg`}
                          width={16}
                          height={16}
                          alt={tag}
                          className='mr-2'
                        />
                      ))}
                    </div>
                  </div>
                  <h2 className='my-0'>{memo.meta.title}</h2>
                </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  )
}


