import React from 'react';
import { useSelector } from 'react-redux';

export default function Counter(props) {
  const count = useSelector((store) => store.count);
  return (
    <div className="counter">
      Current Count: {count}
    </div>
  );
}
