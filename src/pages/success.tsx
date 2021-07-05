import React from 'react';
import style from '../styles/success.module.scss';
import Image from 'next/image';

export default () => {
  return (
    <div className={style.container}>
      <h2>Congratulations!</h2>
      <p>Your account has been created successfully.</p>
      <Image
        src='/images/giphy.gif'
        height={200}
        width={200}
        alt='celebration'
      />
    </div>
  )
}
