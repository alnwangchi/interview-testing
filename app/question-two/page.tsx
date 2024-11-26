'use client';
import dayjs, { Dayjs } from 'dayjs';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import { FC, useState } from 'react';

const DatePicker: FC = () => {
  const [date, setDate] = useState(dayjs());

  const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(null);

  const cannotChangeMonth = selectedStartDate || selectedEndDate;

  const handleDateClick = (day: Dayjs) => {
    if (!selectedStartDate) {
      // 如果還沒有選擇開始日期，直接設定為開始日期
      setSelectedStartDate(day);
    } else {
      if (selectedEndDate) {
        // 已經有開始和結束日期的情況
        if (day.isBefore(selectedStartDate)) {
          // 如果選擇的日期早於當前開始日期，則延長開始日期
          setSelectedStartDate(day);
        } else if (day.isAfter(selectedEndDate)) {
          // 如果選擇的日期晚於當前結束日期
          setSelectedEndDate(day);
        } else {
          // 日期在開始和結束日期之間的邏輯保持不變
          const startDistance = Math.abs(day.diff(selectedStartDate, 'day'));
          const endDistance = Math.abs(day.diff(selectedEndDate, 'day'));

          if (startDistance <= endDistance) {
            // 如果更靠近開始日期，更新結束日期
            setSelectedEndDate(day);
          } else {
            // 如果更靠近結束日期，更新開始日期
            setSelectedStartDate(day);
          }
        }
      } else {
        // 只有開始日期，還沒有結束日期的情況
        if (day.isBefore(selectedStartDate)) {
          // 如果選擇的日期早於當前開始日期，將新日期設為開始日期
          setSelectedStartDate(day);
        } else {
          // 如果選擇的日期晚於開始日期
          setSelectedEndDate(day);
        }
      }
    }
  };

  const renderCalendar = () => {
    const startDay = date.startOf('month').startOf('week');
    const endDay = date.endOf('month').endOf('week');
    const days = endDay.diff(startDay, 'day') + 1;

    return (
      <div className='grid grid-cols-7 gap-1'>
        {Array.from({ length: days }).map((_, idx) => {
          const currentDate = startDay.add(idx, 'day');
          const isCurrentMonth = currentDate.isSame(date, 'month');
          const isToday = currentDate.isSame(dayjs(), 'day');
          const isBetweenDates =
            selectedStartDate &&
            selectedEndDate &&
            currentDate.isAfter(selectedStartDate, 'day') &&
            currentDate.isBefore(selectedEndDate, 'day');

          return (
            <div
              key={idx}
              className={`flex justify-center items-center p-3 bg-white text-black ${
                !isCurrentMonth ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
              } ${isToday ? 'bg-yellow-100' : ''} ${
                selectedStartDate?.isSame(currentDate) || selectedEndDate?.isSame(currentDate)
                  ? 'bg-blue-300'
                  : ''
              } 
              ${isBetweenDates ? 'bg-blue-300' : ''}`}
              onClick={() => {
                if (!isCurrentMonth) return;
                handleDateClick(currentDate);
              }}
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
          className={`cursor-pointer ${cannotChangeMonth ? 'opacity-40 cursor-not-allowed' : ''}`}
          onClick={() => {
            if (cannotChangeMonth) return;
            setDate((prev) => prev.subtract(1, 'month'));
          }}
        />
        <h2 className='text-xl font-bold'>{date.format('YYYY 年 MM 月')}</h2>
        <CircleArrowRight
          className={`cursor-pointer ${cannotChangeMonth ? 'opacity-40 cursor-not-allowed' : ''}`}
          onClick={() => {
            if (cannotChangeMonth) return;
            setDate((prev) => prev.add(1, 'month'));
          }}
        />
      </div>
      <div className=''>{renderCalendar()}</div>
      <div className='flex gap-5 text-white'>
        <div className='flex-1 flex items-center gap-5'>
          <div className='flex-1'>開始日期 : {selectedStartDate?.format('YYYY-MM-DD')}</div>
          <div className='flex-1'>結束日期 : {selectedEndDate?.format('YYYY-MM-DD')}</div>
        </div>
        <button
          onClick={() => {
            setSelectedStartDate(null);
            setSelectedEndDate(null);
            setDate(dayjs());
          }}
          className='border border-white rounded-md px-5 py-1'
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='space-y-10'>
        <h1 className='text-center text-3xl text-white font-bold'>React Question 2 - Task 1</h1>
        <DatePicker />
      </div>
    </div>
  );
}
