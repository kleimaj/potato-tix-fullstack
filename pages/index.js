import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { ShowContainer } from '../src/components';

export default function Home() {
  const [idx, setIdx] = useState(0);
  const [upcomingShows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(0);
  const [seconds, setSeconds] = useState(3);
  const intervalRef = useRef();

  const fetchShows = async () => {
    const res = await fetch(`/api/tickets`);
    console.log(res);
    if (res.status === 500) {
      setError(1);
      countDown();
      return;
    }
    const data = await res.json();
    setShows(data);
  };

  const countDown = () => {
    intervalRef.current = setInterval(() => {
      setSeconds((t) => t - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    fetchShows();
  }, []);
  useEffect(() => {
    if (seconds <= 0) {
      clearInterval(intervalRef.current);
      window.location.reload(false);
    }
  }, [seconds]);

  const loadShows = async () => {
    setLoading(true);
    setIdx((idx += 3));
    const res = await fetch(`/api/tickets/${idx}`);
    const newShows = await res.json();
    console.log(newShows);
    setShows([...upcomingShows, ...newShows]);

    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>Potato Tix</title>
        <meta
          name='description'
          content='Find out about the upcoming shows at The Baked Potato'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-col py-6 px-4 sm:p-6 md:py-10 md:px-8 justify-center'>
        <div className='flex items-center justify-center mb-5'>
          <Image
            alt='Baked Potato Logo'
            className='object-fit'
            src={
              'https://www.thebakedpotato.com/wp-content/uploads/2017/08/logo-1.png'
            }
            width={400}
            height={'100%'}
          />
        </div>
        <h1 className='text-3xl font-bold underline text-center'>
          Upcoming Shows
        </h1>
        <p className='mb-4 xs:mb-6 sm:mb-6 md:mb-4 lg:mb-0 mt-2 text-lg text-gray-700 dark:text-gray-400 text-center'>
          Updates are live (web scraped from{' '}
          <a href='https://www.thebakedpotato.com' className='text-indigo-500'>
            www.thebakedpotato.com
          </a>
          )
        </p>
        <div className='flex flex-col items-center container mx-auto px-2 md:px-12 justify-center'>
          {upcomingShows.length ? (
            <ShowContainer
              upcomingShows={upcomingShows}
              loadShows={loadShows}
              loading={loading}
            />
          ) : (
            <div className='flex flex-col items-center justify-center'>
              {error ? (
                <div role='alert'>
                  <div className='bg-red-500 text-white font-bold rounded-t px-4 py-2 text-center'>
                    Server Error
                  </div>
                  <div className='border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700'>
                    <p>retrying in ... {seconds}</p>
                  </div>
                </div>
              ) : (
                <>
                  <p className='text-gray-500'>Loading Shows...</p>
                  <svg
                    className='animate-spin -ml-1 mr-3 h-10 w-10 text-black mt-5'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>Developed by Jacob Kleiman</footer>
    </div>
  );
}

// server-side rendering sales
// export async function getServerSideProps() {
//   const res = await fetch(process.env.BACKEND_URL + '/tickets');
//   const data = await res.json();
//   // placeholder
//   // const data = [];
//   // const data = [
//   //   {
//   //     artist: 'ALLEN HINDS GROUP',
//   //     date: 'Wednesday - 12/29/2021',
//   //     set1: 17,
//   //     set2: 2,
//   //     patio: 0,
//   //     ticketCount: 21,
//   //     occupancyRate: 0.1346153846153846,
//   //     href: 'https://www.thebakedpotato.com/events/allen-hinds-group-wednesday-december-29-2021/',
//   //     src: 'https://www.thebakedpotato.com/wp-content/uploads/2021/11/A-HINDS-STREAM-PIC.jpg',
//   //   },
//   //   {
//   //     artist: 'MIKE MILLER SUPER ALLSTARS',
//   //     date: 'Thursday - 12/30/2021',
//   //     set1: 2,
//   //     patio: 0,
//   //     set2: 13,
//   //     ticketCount: 15,
//   //     occupancyRate: 0.09615384615384616,
//   //     href: 'https://www.thebakedpotato.com/events/mike-miller-super-allstars-thursday-december-30-2021/',
//   //     src: 'https://www.thebakedpotato.com/wp-content/uploads/2021/11/MIKE-MILLER.jpg',
//   //   },
//   //   {
//   //     artist: 'DON RANDI & QUEST',
//   //     date: 'Friday - 12/31/2021',
//   //     set1: 34,
//   //     set2: 55,
//   //     patio: 2,
//   //     ticketCount: 91,
//   //     occupancyRate: 0.5833333333333334,
//   //     href: 'https://www.thebakedpotato.com/events/don-randi-quest-friday-december-31-2021/',
//   //     src: 'https://www.thebakedpotato.com/wp-content/uploads/2021/08/New-Don-Randi-pic.png',
//   //   },
//   // ];
//   return { props: { shows: data } };
// }
