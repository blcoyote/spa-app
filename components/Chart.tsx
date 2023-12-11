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
  const newData = data.filter(function (value, index, Arr) {
    return index % 2 == 0;
  });

  return (
    <div className='flex justify-center items-center min-h-fit md:col-span-2'>
      <Card className='w-full drop-shadow-md'>
        <CardHeader>
          <CardTitle className='text-lg font-semibold text-foreground'>Historik (24 timer)</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={newData} margin={{ top: 20, left: -30 }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey='timestamp'
                tickFormatter={(value) => {
                  return dayjs(value).format('HH:mm');
                }}
              />
              <YAxis />
              <Tooltip />
              <Legend align='right' />
              <Line name='Luft temperatur' type='monotone' dataKey='temp_air' stroke='#8884d8' />
              <Line name='Vand temperatur' type='monotone' dataKey='temp_water' stroke='#82ca9d' />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
