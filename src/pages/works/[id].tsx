import fs from 'fs';
import matter from 'gray-matter';
import Layout from '../../components/Layout';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CONSTS } from 'consts';

type Props = {
  params: {
    id: string;
  };
  meta: {
    title: string;
    desc: string;
    launchedAt: string;
    intro: string;
    img: string;
    stacks: string[];
    frameworks: string[];
    type: string;
    url: string;
    thumb: string;
    next: string;
    prev: string;
    keys: string[];
    git: string;
    memo: string;
    memoTitle: string;
  }
  content: MDXRemoteSerializeResult;
};

export const getStaticProps = async ({ params }: Props) => {
  const file = fs.readFileSync(`src/pages/works/data/${params.id}.mdx`, 'utf-8');
  const { data, content } = matter(file);
  const mdxSource = await serialize(content);
  console.log(params)

  return {
    props: {
      params,
      meta: data,
      content: mdxSource,
    },
  };
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync('src/pages/works/data');
  const paths = files.map((fileName) => ({
    params: {
      id: fileName.replace(/\.mdx$/, ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default function Work({ meta, content, params }: Props) {
  const lastKey = [...meta.keys].pop()

  return (
      <Layout
        meta={{
          title: `${meta.title}`,
          desc: `Webエンジニア小野田が制作した${meta.title}です。${meta.desc}`,
          image: `${CONSTS.HOST}/img/${meta.thumb}`,
          url: `${CONSTS.HOST}/works/${params.id}`
        }}>
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 25, opacity: 0 }}
          exit={{ y: 25, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.2 }}
        >
        <header className='max-w-2xl mx-auto my-12 text-center'>
          <h1 className='text-center sm:text-3xl text-2xl sm:my-4 my-2'>{meta.title}</h1>
          <p className='text-center text-md font-bold sm:my-4 my-2'>{meta.launchedAt.toString().slice(0, 4)}</p>
          {meta.url !== '' &&
            <div className='sm:my-4 my-2 p-2 flex items-bottom justify-center hover:opacity-80 duration-75 cursor-pointer'>
              <a href={meta.url} target='_blank' rel='noopener noreferrer' className=''>{meta.url}</a>
              <Image
                  src='/img/svg/arrow-up-right.svg'
                  width={16}
                  height={16}
                  alt='target blank'
                  className='ml-1'
                />
            </div>
          }
        </header>

        <div className='max-w-4xl mx-auto sm:w-full'>
          {meta.img && <Image src={`/img/${meta.thumb}`} width={1200} height={600} alt={meta.title} className='w-full mb-12 mx-auto' />}
        </div>
        <div className='sm:my-20 sm:py-20 my-8 py-8 w-full bg-slate-100 '>
          <div className='max-w-6xl mx-auto flex justify-center'>
            <div className='flex text-sm'>
              {meta.stacks.map((stack) => (
                <Image
                  key={stack}
                  src={`/img/svg/${stack}.svg`} width={64} height={64} alt={stack}
                  className='mx-2 sm:mx-6 w-10 h-10 sm:w-16 sm:h-16'
                />
              ))}
            </div>
          </div>
        </div>
        <div className='max-w-4xl mx-auto sm:px-0 px-4'>
          <div className='sm:text-base text-sm'><MDXRemote {...content} /></div>
        </div>
        <div className='max-w-4xl mx-auto sm:-mt-10 my-2 sm:px-0 px-4 leading-3'>
          {meta.keys.length !== 1 && (<>
            <span className='mr-2 text-xs'>keys:</span>
            {meta.keys.map((key) => (<>
              <span key={key} className='text-xs'>{key}</span>
              {lastKey !== key && <span className='text-xs mx-1'>/</span>}
              </>
              ))}
              </>)}
        </div>
        <div className='max-w-4xl mx-auto my-2 sm:px-0 px-4 leading-3 text-xs hover:opacity-80 duration-75'>
          {meta.git !== '' && (<div className='flex items-center'>
            <a href={meta.git} target='_blank' rel='noopener noreferrer'>
            <span className='mr-2 text-xs'>git:</span>{meta.git}<Image
            src='/img/svg/arrow-up-right.svg'
            width={12}
            height={12}
            alt='target blank'
            className='ml-1 inline'
          /></a>
          </div>)}
        </div>
        <div className='max-w-4xl mx-auto my-2 sm:px-0 px-4 leading-3 text-xs hover:opacity-80 duration-75'>
          {meta.memo !== '' && (<div className='flex items-center'>
            <Link href={`/memos/${meta.memo}`} rel='noopener noreferrer'>
            <span className='mr-2 text-xs'>memo:</span>{meta.memoTitle}</Link>
          </div>)}
        </div>

        <div className='flex justify-between max-w-4xl mx-auto sm:my-20 my-8 sm:px-0 px-4'>
          {meta.prev !== '' ?
            <div className='buttonHoverReverse flex justify-between align-text-bottom transition-all ease-in-out mb-4'>
              <Link href={`/works/${meta.prev.toLowerCase()}`} className='text-2xl font-bold flex items-top my-2'>
                <Image
                  src='/img/svg/arrow-left1.svg'
                  width={16}
                  height={16}
                  alt='arrow left'
                  className='mr-2 align-middle'
                />
                <span className='hover:opacity-80 duration-100 align-middle leading-0 text-sm my-0'>{meta.prev}</span>
              </Link>
            </div>
          :
            <div></div>
          }
          {meta.next !== '' &&
            <div className='buttonHover flex justify-between align-text-bottom transition-all ease-in-out mb-4'>
              <Link href={`/works/${meta.next.toLowerCase()}`} className='text-2xl font-bold flex items-top my-2'>
                <span className='hover:opacity-80 duration-100 align-middle leading-0 text-sm my-0'>{meta.next}</span>
                <Image
                  src='/img/svg/arrow-right1.svg'
                  width={16}
                  height={16}
                  alt='arrow left'
                  className='ml-2 align-middle'
                />
              </Link>
            </div>
          }
        </div>
        </motion.div>
      </Layout>
  );
}
