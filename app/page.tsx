import WeatherCard from '@/components/WeatherCard';

export default function Home() {
  return (
    <div className='container mx-auto flex justify-center'>
      <div className='grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 gap-5 md:gap-10'>
        <WeatherCard title='Luft temperatur' />
        <WeatherCard title='Vand temperatur' />
      </div>
    </div>
  );
}
