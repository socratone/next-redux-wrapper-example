import React from 'react';
import Link from 'next/link';

export default function IndexPage() {
  return (
    <div>
      <Link href="/counter">counter 예제</Link>
    </div>
  );
}
