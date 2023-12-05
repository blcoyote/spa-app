import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import { IconCloudSun, IconSlashCircle, IconSnowflake } from './ui/icons';
import { Separator } from '@components/ui/separator';

interface WeatherCardProps {
  title: string;
  date?: string;
  time?: string;
  temperature?: number;
}

export default function WeatherCard(props: WeatherCardProps) {
  const { title, date, time, temperature } = props;
  return (
    <Card className='border-primary'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold text-foreground'>{title ?? 'ingen data'}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className='grid gap-4 py-4'>
        <div className='flex justify-between items-center gap-1'>
          <p className='text-sm text-muted-foreground'>{date ?? 'ingen data'}</p>
          <p className='text-sm text-muted-foreground'>{time ?? 'ingen data'}</p>
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-xl font-bold text-foreground'>{`${temperature ?? ' - '}°C`}</p>
          {selectIcon(temperature)}
        </div>
      </CardContent>
    </Card>
  );
}

function selectIcon(temperature?: number) {
  if (!temperature) return <IconSlashCircle className='h-10 w-10 text-primary' />;
  if (temperature > 25) {
    return <IconCloudSun className='h-10 w-10 text-primary' />;
  } else {
    return <IconSnowflake className='h-10 w-10 text-primary' />;
  }
}
