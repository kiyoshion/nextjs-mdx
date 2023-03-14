import Layout from "components/Layout";

export default function Contact() {
  return (
    <Layout meta={{
      title: 'Contact',
      desc: 'Contact',
    }}>
      <div className='max-w-7xl mx-auto p-4'>
        <h1>Contact</h1>
        <p>If you wanna contact me, say hi via below.</p>
      </div>
    </Layout>
  );
}
