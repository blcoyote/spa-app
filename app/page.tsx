import { Chart24h } from '@/components/Chart';
import WeatherCard from '@/components/WeatherCard';
import { SPAModel } from '@/models/spa.model';
import { roundTo } from '@/utils/round';
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
    console.log(res);
  }

  return res.json().then((data) => {
    return data as SPAModel;
  });
}
async function getLast24hRecord() {
  const url = process.env.baseurl;
  const key = process.env.key;
  const res = await fetch(`${url}/spa/last24h?Key=${key}`, {
    next: { revalidate: 5 * 60, tags: ['spa', 'spaLast24hRecord'] },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
  }

  return res.json().then((data) => {
    return data as SPAModel[];
  });
}

export default async function Home() {
  const lastRecord = await getLastRecord();
  const last24hRecord = await getLast24hRecord();
  const timestamp = dayjs(lastRecord.timestamp);

  return (
    <div className='h-fit'>
      <div className=' mx-auto flex justify-center'>
        <div className='grid w-full md:w-fit grid-flow-row-dense grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 lg:gap-20'>
          <WeatherCard
            title='Luft-temperatur'
            temperature={roundTo(lastRecord.temp_air, 2)}
            date={timestamp.format('DD/MM-YYYY')}
            time={timestamp.format('HH:mm')}
          />
          <WeatherCard
            title='Vand-temperatur'
            temperature={roundTo(lastRecord.temp_water, 2)}
            date={timestamp.format('DD/MM-YYYY')}
            time={timestamp.format('HH:mm')}
          />
          <Chart24h data={last24hRecord} />
        </div>
      </div>
    </div>
  );
}
