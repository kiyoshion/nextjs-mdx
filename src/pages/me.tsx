/* eslint-disable react/no-unescaped-entities */
import Layout from "components/Layout";

export default function Me() {
  return (
    <Layout meta={{
      title: 'About',
      desc: 'About',
    }}>
      <div className='max-w-7xl mx-auto p-4'>
        <h1>About</h1>
        <p>I'm a web engineer in Japan.</p>
      </div>
    </Layout>
  );
}
