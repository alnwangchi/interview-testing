'use client';
import dayjs from 'dayjs';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import { FC, useState } from 'react';

const DatePicker: FC = () => {
  const [date, setDate] = useState(dayjs());

  const renderCalendar = () => {
    const startDay = date.startOf('month').startOf('week');
    const endDay = date.endOf('month').endOf('week');
    const days = endDay.diff(startDay, 'day') + 1;
    console.log({ startDay, endDay, days });

    return (
      <div className='grid grid-cols-7 gap-2'>
        {Array.from({ length: days }).map((_, idx) => {
          const currentDate = startDay.add(idx, 'day');
          const isCurrentMonth = currentDate.isSame(date, 'month');
          return (
            <div
              key={idx}
              className={`flex justify-center items-center p-3  bg-white text-black ${
                !isCurrentMonth ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {currentDate.format('D 日')}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className='min-w-[400px] space-y-5'>
      <div className='flex justify-between items-center gap-5 text-white'>
        <CircleArrowLeft
          className='cursor-pointer'
          onClick={() => {
            setDate((prev) => prev.subtract(1, 'month'));
          }}
        />
        <h2 className='text-xl font-bold'>{date.format('YYYY 年 MM 月')}</h2>
        <CircleArrowRight
          className='cursor-pointer'
          onClick={() => {
            setDate((prev) => prev.add(1, 'month'));
          }}
        />
      </div>
      <div className=''>{renderCalendar()}</div>
    </div>
  );
};

export default function Home() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <DatePicker />
    </div>
  );
}
