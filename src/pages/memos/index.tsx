import Layout from 'components/Layout';
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation'
import Image from 'next/image';

type MemoProps = {
  id: string;
  meta: {
    title: string;
    desc: string;
    createdAt: string;
    tags: string[];
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
        title: 'memos',
        desc: '制作実績'
      }}
    >
      <div className='max-w-7xl mx-auto p-4 text-sm'>
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
        <RenderTags />
      </div>
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
                    // <span key={tag} className='text-xs py-1 px-2 bg-gray-100 mr-2 rounded-sm'>{tag}</span>
                  ))}
                </div>
              </div>
              <h2 className='my-0'>{memo.meta.title}</h2>
            </Link>
        ))}
      </div>
    </Layout>
  )
}


