//https://recharts.org/en-US
'use client';
import { SPAModel } from '@/models/spa.model';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CardTitle, CardHeader, Card, CardContent } from '@/components/ui/card';
import { Separator } from './ui/separator';
import dayjs from 'dayjs';

export const Chart24h = (props: { data: SPAModel[] }) => {
  const { data } = props;
  const newData = data.sort((a, b) => {
    return a.id - b.id;
  });

  return (
    <Card className='w-full drop-shadow-md'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold text-foreground'>Seneste døgn</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={data} margin={{ top: 20, left: -30 }}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='timestamp'
              tickFormatter={(value) => {
                return dayjs(value).format('HH:mm');
              }}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(value) => {
                return dayjs(value).format('DD/MM-YYYY HH:mm');
              }}
            />
            <Legend align='right' />
            <Line name='Luft' type='monotone' dataKey='temp_air' stroke='#8884d8' strokeWidth={2} dot={false} />
            <Line name='Vand' type='monotone' dataKey='temp_water' stroke='#82ca9d' strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
