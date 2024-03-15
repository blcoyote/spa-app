import { Chart24h } from '@/components/Chart';
import WeatherCard from '@/components/WeatherCard';
import type { SPAModel } from '@/models/spa.model';
import { roundTo } from '@/lib/round';
import dayjs from 'dayjs';
import next from 'next';

async function getLastRecord() {
  const key = process.env.KEY ?? '';
  const res = await fetch(`http:192.168.0.20:7000/spa/last?Key=${key}`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error(`Error: ${res.status}, ${res.statusText}`);
  }

  return res.json().then((data) => {
    return data as SPAModel;
  });
}
async function getLast24hRecord() {
  const key = process.env.KEY ?? '';
  const res = await fetch(`http:192.168.0.20:7000/spa/last24h?Key=${key}`, {
    next: { revalidate: 200, tags: ['spa', 'spaLast24hRecord'] },
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status}, ${res.statusText}`);
  }

  return res.json().then((data) => {
    return data as SPAModel[];
  });
}

export default async function Home() {
  let lastRecord: SPAModel;
  try {
    lastRecord = await getLastRecord();
  } catch (error) {
    console.log(error);
    return <div>Failed to fetch data</div>;
  }

  const last24hRecord = await getLast24hRecord();
  const timestamp = dayjs(lastRecord.timestamp);

  return (
    <div className='h-fit'>
      <div className=' mx-auto flex justify-center'>
        <div className='grid w-full md:w-fit grid-flow-row-dense grid-cols-1 md:grid-cols-2 gap-5 md:gap-10'>
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
          <div className='flex justify-center items-center min-h-fit md:col-span-2 mb-5'>
            <Chart24h data={last24hRecord} />
          </div>
        </div>
      </div>
    </div>
  );
}
