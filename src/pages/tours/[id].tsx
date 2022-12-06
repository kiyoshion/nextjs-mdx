import fs from 'fs';
import matter from 'gray-matter';
import Layout from '../../components/Layout';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

type Props = {
  params: {
    id: string;
  };
  meta: {
    title: string;
    desc: string;
    createdAt: string;
  }
  content: MDXRemoteSerializeResult;
};

export const getStaticProps = async ({ params }: Props) => {
  const file = fs.readFileSync(`src/pages/tours/data/${params.id}.mdx`, 'utf-8');
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
  const files = fs.readdirSync('src/pages/tours/data');
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

export default function Tour({ meta, content }: Props) {
  return (
      <Layout meta={meta}>
        <header>
          <h1>{meta.title}</h1>
        </header>
        <MDXRemote {...content} />
      </Layout>
  );
}
