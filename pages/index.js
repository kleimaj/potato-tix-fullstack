import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home({ upcomingShows }) {
  console.log(upcomingShows);
  return (
    <div className={styles.container}>
      <Head>
        <title>Potato Tix</title>
        <meta
          name='description'
          content='Find out about the upcoming shows at The Baked Potato'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Upcoming Shows at <a>The Baked Potato</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href='https://nextjs.org/docs' className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href='https://nextjs.org/learn' className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href='https://github.com/vercel/next.js/tree/master/examples'
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>Developed by Jacob Kleiman</footer>
    </div>
  );
}

// server-side rendering sales
export async function getServerSideProps() {
  // const res = await fetch('http://localhost:3000/api/tickets');
  // const data = await res.json();
  // placeholder
  const data = [
    {
      artist: 'ALLEN HINDS GROUP',
      date: 'Wednesday - 12/29/2021',
      set1: 17,
      set2: 4,
      patio: 0,
      ticketCount: 21,
      occupancyRate: 0.1346153846153846,
      href: 'https://www.thebakedpotato.com/events/allen-hinds-group-wednesday-december-29-2021/',
    },
    {
      artist: 'MIKE MILLER SUPER ALLSTARS',
      date: 'Thursday - 12/30/2021',
      set1: 2,
      patio: 0,
      set2: 13,
      ticketCount: 15,
      occupancyRate: 0.09615384615384616,
      href: 'https://www.thebakedpotato.com/events/mike-miller-super-allstars-thursday-december-30-2021/',
    },
    {
      artist: 'DON RANDI & QUEST',
      date: 'Friday - 12/31/2021',
      set1: 34,
      set2: 55,
      patio: 2,
      ticketCount: 91,
      occupancyRate: 0.5833333333333334,
      href: 'https://www.thebakedpotato.com/events/don-randi-quest-friday-december-31-2021/',
    },
  ];
  return { props: { upcomingShows: data } };
}
