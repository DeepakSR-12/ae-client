// Avatar.tsx
import React from 'react';
import styles from './Avatar.module.scss';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  url?: string;
  name?: string;
}

const Avatar: React.FC<AvatarProps> = ({ url, name, onClick, ...props }) => {
  const getInitials = (name: string) => {
    const initials = name.split(' ').map(part => part[0].toUpperCase()).join('');
    return initials.length > 2 ? initials.slice(0, 2) : initials;
  };

  return (
    <div className={styles.avatar} onClick={onClick} {...props}>
      {url ? (
        <img src={url} alt="Avatar" className={styles.image} />
      ) : (
        <span className={styles.initials}>
          {name ? getInitials(name) : 'NA'}
        </span>
      )}
    </div>
  );
};

export default Avatar;
