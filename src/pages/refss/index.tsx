import Layout from 'components/Layout';
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';

type RefProps = {
  id: string;
  meta: {
    title: string;
    desc: string;
    createdAt: string;
  };
}

type RefsProps = {
  refs: RefProps[];
}

export const getStaticProps = () => {
  const files = fs.readdirSync('src/pages/refs/data');
  const refs = files.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, '');
    const fileContent = fs.readFileSync(`src/pages/refs/data/${fileName}`, 'utf-8');
    const { data } = matter(fileContent);
    console.log(data)

    return {
      id,
      meta: data,
    };
  });

  return {
    props: {
      refs,
    },
  };
};

export default function Refs({ refs }: RefsProps) {
  return (
    <Layout
      meta={{
        title: 'Refs',
        desc: 'リファレンス'
      }}
    >
      <div className='flex flex-col'>
        <h1>Quick References</h1>
        <p>What you want to know, you can access it quickly.</p>
      </div>
      {refs.map((ref: RefProps) => (
        <Link href={`/refs/${ref.id}`} key={ref.id}>
          <h2>{ref.meta.title}</h2>
        </Link>
      ))}
    </Layout>
  )
}


