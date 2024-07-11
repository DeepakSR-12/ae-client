import React from 'react';
import Feed from '../../components/feed/page';
import { feedData } from '../../utils/constants';
import styles from './page.module.scss';

const Landing = () => {
  return (
    <div className={styles.landing}>
      <Feed feedData={feedData} />
    </div>
  );
};

export default Landing;
