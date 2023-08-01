import fs from 'fs';
import matter from 'gray-matter';
import Layout from '../../components/Layout';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Image from 'next/image';
import Link from 'next/link';
import { CONSTS } from 'consts';

type Props = {
  params: {
    id: string;
  };
  meta: {
    title: string;
    desc: string;
    img: string;
    createdAt: string;
    tags: string[]
  }
  content: MDXRemoteSerializeResult;
};

export const getStaticProps = async ({ params }: Props) => {
  const file = fs.readFileSync(`src/pages/memos/data/${params.id}.mdx`, 'utf-8');
  const { data, content } = matter(file);
  const mdxSource = await serialize(content);

  return {
    props: {
      params,
      meta: data,
      content: mdxSource,
    },
  };
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync('src/pages/memos/data');
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
  return (
      <Layout meta={{
        title: `${meta.title}`,
        desc: `${meta.desc}`,
        image: `${CONSTS.HOST}/img/${meta.img}`,
        url: `${CONSTS.HOST}/memos/${params.id}`
      }}>
        <header className='max-w-2xl mx-auto my-12 sm:px-0 px-4'>
          <h1 className='text-center sm:text-3xl text-xl'>{meta.title}</h1>
          <p className='text-center'>{meta.createdAt}</p>
        </header>
        {meta.img && <Image src={`/img/${meta.img}`} width={1000} height={500} alt={meta.title} className='w-full sm:mb-12 mb-4 mx-auto' />}
        <div className='memo-content max-w-2xl mx-auto sm:p-0 p-4'>
          <MDXRemote {...content} />
        </div>
        <div className='max-w-2xl mx-auto sm:p-0 p-4'>
          {meta.tags.map((tag: string) => (
            <Link href={{
              pathname: '/memos',
              query: { name: tag }
            }} key={tag} className='text-xs py-1 px-2 bg-gray-100 mr-2 rounded-sm'>{tag}</Link>
          ))}
        </div>
      </Layout>
  );
}
