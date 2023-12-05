import WeatherCard from '@/components/WeatherCard';

export default function Home() {
  return (
    <div className='container mx-auto flex justify-center'>
      <div className='grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 lg:gap-20'>
        <WeatherCard title='Luft temperatur' temperature={15} date='05/12-2023' time='21:58' />
        <WeatherCard title='Vand temperatur' temperature={38} date='05/12-2023' time='21:58' />
      </div>
    </div>
  );
}
