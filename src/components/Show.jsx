import Image from 'next/image';
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
function calculateRed(percentage) {
  if (percentage >= 90) {
    return 'bg-red-900 text-white';
  } else if (percentage >= 80) {
    return 'bg-red-800 text-white';
  } else if (percentage >= 70) {
    return 'bg-red-700 text-white';
  } else if (percentage >= 60) {
    return 'bg-red-600 text-white';
  } else if (percentage >= 50) {
    return 'bg-red-500 text-white';
  } else if (percentage >= 40) {
    return 'bg-red-400 text-white';
  } else if (percentage >= 30) {
    return 'bg-red-300';
  } else if (percentage >= 20) {
    return 'bg-red-200';
  } else {
    return 'bg-red-100';
  }
}
export const Show = ({
  artist,
  date,
  href,
  patio,
  set1,
  set2,
  src,
  ticketCount,
  occupancyRate,
}) => (
  <article className='rounded overflow-hidden shadow-lg'>
    <div className='text-center pt-4'>
      <Image
        alt={toTitleCase(artist)}
        className='block object-cover'
        width={250}
        height={250}
        src={src}
      />
    </div>
    <div className='px-0 sm:px-6 py-4'>
      <h3 className='font-bold text-xl mb-2 text-center'>
        {toTitleCase(artist)}
      </h3>

      <dl className='flex flex-wrap divide-y divide-gray-200 border-b border-gray-200 text-sm sm:text-base lg:text-sm xl:text-base dark:divide-gray-200/5 dark:border-gray-200/5 justify-center'>
        <div className='px-4 sm:px-6 lg:px-4 xl:px-6 pb-4'>
          <dt className='sr-only'>Date</dt>
          <dd className='text-gray-500'>
            <time dateTime='2020-11-15T10:00:00-05:00'>{date}</time>
          </dd>
        </div>
        <div className='md:justify-start lg:justify-between xl:justify-start justify-center w-full flex-none flex items-center p-4 sm:p-6 lg:p-4 xl:p-6'>
          <dt className='w-2/5 sm:w-1/4 flex-none text-gray-700'>
            {date == 'Friday - 12/31/2021' ? 'Inside Cover' : 'Set 1'}
          </dt>
          <dd className={set1 >= 52 ? 'font-bold' : ''}>{set1} Tickets Sold</dd>
        </div>
        <div className='md:justify-start lg:justify-between xl:justify-start justify-center w-full bg-gray-100 flex-none flex items-center p-4 sm:p-6 lg:p-4 xl:p-6'>
          <dt className='w-2/5 sm:w-1/4 flex-none text-gray-700'>
            {date == 'Friday - 12/31/2021' ? 'Full Package' : 'Set 2'}
          </dt>
          <dd className={set2 >= 52 ? 'font-bold' : ''}>{set2} Tickets Sold</dd>
        </div>
        <div className='md:justify-start lg:justify-between xl:justify-start justify-center w-full flex-none flex items-center p-4 sm:p-6 lg:p-4 xl:p-6'>
          <dt className='w-2/5 sm:w-1/4 flex-none text-gray-700'>Patio</dt>
          <dd className={patio == 26 ? 'font-bold' : ''}>
            {patio} Tickets Sold
          </dd>
        </div>
        <div className='md:justify-start lg:justify-between xl:justify-start justify-center w-full bg-gray-100 flex-none flex items-center p-4 sm:p-6 lg:p-4 xl:p-6'>
          <dt className='w-2/5 sm:w-1/4 flex-none text-gray-900 font-semibold'>
            Total
          </dt>
          <dd className='font-semibold'>{ticketCount} Tickets Sold</dd>
        </div>
        <div className='md:justify-between lg:justify-between xl:justify-start justify-center w-full flex-none flex items-center p-4 sm:py-5 sm:px-6 lg:p-4 xl:py-5 xl:px-6'>
          <dt className='w-2/5 sm:w-1/4 flex-none text-gray-900'>
            Attendee Rate
          </dt>
          <dd
            className={
              'm-4 text-sm font-medium rounded-full py-1 px-3 ' +
              calculateRed(Math.trunc(occupancyRate * 100))
            }
          >
            {Math.trunc(occupancyRate * 100)}%
          </dd>
        </div>
      </dl>
      {/* <p className='text-gray-700 text-base'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
        quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium
        nihil.
      </p> */}
      <a
        className='md:justify-start justify-center flex text-center text-indigo-500 underline p-4 sm:p-6 lg:p-4 xl:p-6'
        href={href}
      >
        See more about this show
      </a>
    </div>
  </article>
);
