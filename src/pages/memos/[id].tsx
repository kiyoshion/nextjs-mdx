import fs from 'fs';
import matter from 'gray-matter';
import Layout from '../../components/Layout';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Image from 'next/image';

type Props = {
  params: {
    id: string;
  };
  meta: {
    title: string;
    desc: string;
    img: string;
  }
  content: MDXRemoteSerializeResult;
};

export const getStaticProps = async ({ params }: Props) => {
  const file = fs.readFileSync(`src/pages/works/data/${params.id}.mdx`, 'utf-8');
  const { data, content } = matter(file);
  const mdxSource = await serialize(content);

  return {
    props: {
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

export default function Work({ meta, content }: Props) {
  return (
      <Layout meta={meta}>
        <header className='max-w-2xl mx-auto my-12'>
          <h1 className='text-center text-3xl'>{meta.title}</h1>
        </header>
        {meta.img && <Image src={`/img/${meta.img}`} width={1000} height={500} alt={meta.title} className='w-full mb-12 mx-auto' />}
        <div className='max-w-5xl mx-auto'>
          <div className='max-w-md mr-8'><MDXRemote {...content} /></div>
          <div></div>
        </div>
      </Layout>
  );
}
