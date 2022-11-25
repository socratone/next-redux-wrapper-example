import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';

const Counter = () => {
  const [value, setValue] = React.useState('0');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <p>
        <input type="number" value={value} onChange={handleInputChange} />
      </p>
      <p>
        <Link href={`/counter/result?amount=${value}`}>
          <button>인풋 값을 서버로 전송</button>
        </Link>
      </p>
    </div>
  );
};

export default Counter;
