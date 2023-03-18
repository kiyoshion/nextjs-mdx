import Layout from 'components/Layout';
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';

type MemoProps = {
  id: string;
  meta: {
    title: string;
    desc: string;
    launchedAt: string;
  };
}

type MemosProps = {
  memos: MemoProps[];
}

export const getStaticProps = () => {
  const files = fs.readdirSync('src/pages/memos/data');
  const memos = files.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, '');
    const fileContent = fs.readFileSync(`src/pages/memos/data/${fileName}`, 'utf-8');
    const { data } = matter(fileContent);
    console.log(data)

    return {
      id,
      meta: data,
    };
  });

  return {
    props: {
      memos,
    },
  };
};

export default function Memos({ memos }: MemosProps) {
  return (
    <Layout
      meta={{
        title: 'memos',
        desc: '制作実績'
      }}
    >
      <div className='max-w-7xl mx-auto p-4 text-sm flex flex-col'>
        <h1>Memos</h1>
        <p>Tips for developing apps.</p>
      </div>
      <div className='max-w-7xl mx-auto p-4 text-sm flex'>
        {memos.map((memo: MemoProps) => (
          <Link href={`/memos/${memo.id}`} key={memo.id}>
            <h2>{memo.meta.title}</h2>
          </Link>
        ))}
      </div>
    </Layout>
  )
}


