import Image from 'next/image';
export const Show = ({
  artist,
  date,
  href,
  patio,
  set1,
  set2,
  src,
  occupancyRate,
}) => (
  <article className='rounded overflow-hidden shadow-lg'>
    <Image
      alt='Placeholder'
      className='block'
      width='100%'
      height='100%'
      src={src}
    />
    <div className='px-6 py-4'>
      <div className='font-bold text-xl mb-2'>Mountain</div>
      <p className='text-gray-700 text-base'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
        quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium
        nihil.
      </p>
    </div>
    <div className='px-6 pt-4 pb-2'>
      <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
        #photography
      </span>
      <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
        #travel
      </span>
      <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
        #winter
      </span>
    </div>
  </article>
);
