import { Show } from './Show';
import { useState } from 'react';
const buttonClass =
  'mt-5 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150';

export const ShowContainer = ({ upcomingShows, loadShows, loading }) => {
  return (
    <>
      <div className='lg:p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8'>
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
            ticketCount={show.ticketCount}
            occupancyRate={show.occupancyRate}
          />
        ))}
      </div>
      <button
        type='button'
        className={`mt-5 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 ${
          loading ? `cursor-not-allowed` : `cursor-pointer`
        }`}
        onClick={() => {
          if (!loading) loadShows();
        }}
      >
        {loading ? (
          <>
            <svg
              className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
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
            Loading...
          </>
        ) : (
          <>Load More</>
        )}
      </button>
    </>
  );
};
