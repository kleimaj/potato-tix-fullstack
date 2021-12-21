import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Show } from '../src/components';

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

      <main className='flex flex-col py-6 px-4 sm:p-6 md:py-10 md:px-8 justify-center'>
        <h1 className='text-3xl font-bold underline text-center'>
          Upcoming Shows
        </h1>
        <div className='container my-12 mx-auto px-4 md:px-12'>
          <div className='p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
            {upcomingShows.map((show, idx) => (
              <Show
                key={idx}
                artist={show.artist}
                date={show.date}
                href={show.href}
                patio={show.patio}
                set1={show.set1}
                set2={show.set2}
                src={show.src}
                occupancyRate={show.occupancyRate}
              />
            ))}
          </div>
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
      src: 'https://www.thebakedpotato.com/wp-content/uploads/2021/11/A-HINDS-STREAM-PIC.jpg',
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
      src: 'https://www.thebakedpotato.com/wp-content/uploads/2021/11/MIKE-MILLER.jpg',
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
      src: 'https://www.thebakedpotato.com/wp-content/uploads/2021/08/New-Don-Randi-pic.png',
    },
  ];
  return { props: { upcomingShows: data } };
}
