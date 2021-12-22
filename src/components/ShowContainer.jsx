import { Show } from './Show';

export const ShowContainer = ({ upcomingShows }) => (
  <div className='lg:p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
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
);
