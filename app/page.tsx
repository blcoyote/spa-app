import WeatherCard from '@/components/WeatherCard';
import { SPAModel } from '@/models/spa.model';
import dayjs from 'dayjs';
import next from 'next';

async function getLastRecord() {
  const url = process.env.baseurl;
  const key = process.env.key;
  const res = await fetch(`${url}/spa/last?Key=${key}`, {
    next: { revalidate: 5 * 60, tags: ['spa', 'spaLastRecord'] },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const lastRecord = (await getLastRecord()) as SPAModel;
  //const last24hRecord = (await getLastRecord('last24h')) as SPAModel[];
  const timestamp = dayjs(lastRecord.timestamp);

  return (
    <div className='container mx-auto flex justify-center'>
      <div className='grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 lg:gap-20'>
        <WeatherCard
          title='Luft-temperatur'
          temperature={lastRecord.temp_air}
          date={timestamp.format('DD/MM-YYYY')}
          time={timestamp.format('HH:mm')}
        />
        <WeatherCard
          title='Vand-temperatur'
          temperature={lastRecord.temp_water}
          date={timestamp.format('DD/MM-YYYY')}
          time={timestamp.format('HH:mm')}
        />
      </div>
    </div>
  );
}
