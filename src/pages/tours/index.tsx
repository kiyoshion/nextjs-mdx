import Layout from 'components/Layout';
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';

type TourProps = {
  id: string;
  meta: {
    title: string;
    desc: string;
    createdAt: string;
  };
}

type ToursProps = {
  tours: TourProps[];
}

export const getStaticProps = () => {
  const files = fs.readdirSync('src/pages/tours/data');
  const tours = files.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, '');
    const fileContent = fs.readFileSync(`src/pages/tours/data/${fileName}`, 'utf-8');
    const { data } = matter(fileContent);

    return {
      id,
      meta: data,
    };
  });

  return {
    props: {
      tours,
    },
  };
};

export default function Tours({ tours }: ToursProps) {
  return (
    <Layout
      meta={{
        title: 'Tours',
        desc: 'チュートリアル'
      }}
    >
      <div className='flex flex-col'>
        <h1>Tours</h1>
        <p>more Graphical, more Interactive.</p>
      </div>
      {tours.map((tour: TourProps) => (
        <Link href={`/tours/${tour.id}`} key={tour.id}>
          <h2>{tour.meta.title}</h2>
        </Link>
      ))}
    </Layout>
  )
}


