'use client';
import React, { useCallback, useRef, useState } from 'react';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOnChange = useCallback((event: { target: { value: string } }) => {
    const value = event.target.value;

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setQuery(value);
    }, 500);
  }, []);

  return (
    <>
      <input onChange={handleOnChange} />
      <p className='text-white'>{query}</p>
    </>
  );
};

interface Person {
  firstName: string;
  lastName: string;
  profession: 'student' | 'freelancer' | 'productOwner' | 'engineer' | 'systemAnalytics';
  customerID: number;
  note?: string;
}

const people: Person[] = [
  { firstName: 'Coco', lastName: 'Doe', note: '', profession: 'engineer', customerID: 123 },
  { firstName: 'Ean', lastName: 'Smith', note: '', profession: 'freelancer', customerID: 456 },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    note: '',
    profession: 'systemAnalytics',
    customerID: 789,
  },
  { firstName: 'Bob', lastName: 'Brown', note: '', profession: 'student', customerID: 234 },
  {
    firstName: 'Charlie',
    lastName: 'Wilson',
    note: '',
    profession: 'productOwner',
    customerID: 567,
  },
];

const page = () => {
  const sortPeople = (persons: Person[]): Person[] => {
    return persons.sort((a, b) => {
      const keyA = a.firstName + a.lastName + (a.customerID || '');
      const keyB = b.firstName + b.lastName + (b.customerID || '');

      return keyA.localeCompare(keyB, 'en');
    });
  };

  const sortByType = (users: Person[]): Person[] => {
    const professionHierarchy = {
      systemAnalytics: 5,
      engineer: 4,
      productOwner: 3,
      freelancer: 2,
      student: 1,
    };

    return users.sort((a, b) => {
      const priorityA = professionHierarchy[a.profession];
      const priorityB = professionHierarchy[b.profession];

      if (priorityA !== priorityB) {
        return priorityB - priorityA;
      }

      return 0;
    });
  };

  const data1 = people;
  const data2 = JSON.parse(JSON.stringify(people));

  const sortPeopleResult = sortPeople(data1);
  const sortByTypeResult = sortByType(data2);

  // ------------

  const duplicatedItems = [
    1, 1, 1, 5, 2, 3, 4, 3, 3, 3, 3, 3, 2, 6, 7, 5, 4, 4, 7, 8, 8, 0, 1, 2, 3, 1, 3, 3, 7, 8, 4, 2,
    0, 1,
  ];

  const uniq = (ary: number[]) => {
    const set = new Set(ary);
    return Array.from(set);
  };

  const uniqResult = uniq(duplicatedItems);

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='space-y-10 text-center'>
        <h1 className='text-3xl text-white font-bold'>React Question 1</h1>
        <div className='space-y-5'>
          <div className='space-y-3'>
            <div>Origin: {JSON.stringify(people)}</div>
            <div>Q1: {JSON.stringify(sortPeopleResult)}</div>
            <div>Q2: {JSON.stringify(sortByTypeResult)}</div>
          </div>

          <div>
            <p>2.</p>
            <p className='font-bold'>
              Explain why does this color not works, and how to fix make it work on 1st list
            </p>
            <p>因選擇器權重較低</p>
            <p className='font-bold'>
              Write styling make every other line give background color to next one
            </p>
            <p>{`.item:nth-child(2n) {
  background-color: yellow;
}`}</p>
          </div>

          <div>
            <p>3.</p>
            <p>Set 處理</p>
            <div>{JSON.stringify(uniqResult)}</div>
          </div>

          <div>
            <p>4.</p>
            <p className='font-bold'>
              Can you explain about Interface and Enum, please make some examples
            </p>
            <div>保留於口述</div>
          </div>

          <div>
            <p>5.</p>
            <p className='font-bold'>
              Can you explain the problem with the following code, and how to fix it.
            </p>
            <div>
              結果只會加一，因為 react reconciliation 如果期望加三需用 serState(prev ={'>'} prev +=
              1)
            </div>
          </div>

          <div>
            <p>6.</p>
            <p className='font-bold'>
              Please write the sample code to debounce handleOnChange (Do not use any 3th party libs
              other than react)
            </p>
            <p>就是 setTimeout 請輸入文字測試</p>
            <div className='text-black p-3k'>
              <SearchBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
