import Layout from 'components/Layout';
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';

type MovieProps = {
  id: string;
  meta: {
    title: string;
    desc: string;
    launchedAt: string;
  };
}

type MoviesProps = {
  movies: MovieProps[];
}

export const getStaticProps = () => {
  const files = fs.readdirSync('src/pages/movies/data');
  const movies = files.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, '');
    const fileContent = fs.readFileSync(`src/pages/movies/data/${fileName}`, 'utf-8');
    const { data } = matter(fileContent);
    console.log(data)

    return {
      id,
      meta: data,
    };
  });

  return {
    props: {
      movies,
    },
  };
};

export default function Movies({ movies }: MoviesProps) {
  return (
    <Layout
      meta={{
        title: 'movies',
        desc: '感じる世界史'
      }}
    >
      <div className='max-w-7xl mx-auto p-4 text-sm flex flex-col'>
        <h1>Movies</h1>
        <p>Feel history.</p>
      </div>
      <div className='max-w-7xl mx-auto p-4 text-sm flex'>
        {movies.map((movie: MovieProps) => (
          <Link href={`/movies/${movie.id}`} key={movie.id}>
            <h2>{movie.meta.title}</h2>
          </Link>
        ))}
      </div>
    </Layout>
  )
}


