import { Menu } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

const Navigation = () => {
  const [visible, setVisible] = useState(false);

  const handleMenuClick = () => {
    setVisible(!visible);
  };

  return (
    <div style={{ position: 'fixed', top: 0, width: '100%' }}>
      <Menu
        mode='horizontal'
        // visible={visible}
        onClick={handleMenuClick}
      >
        <Menu.Item key='home'>
          <Link href='/'>Home</Link>
        </Menu.Item>
        <Menu.Item key='about'>
          <Link href='/mistakes'>Mistake</Link>
        </Menu.Item>
        <Menu.Item key='explanation'>
          <Link href='/explanation'>Explanation</Link>
        </Menu.Item>
        <Menu.Item key='correction'>
          <Link href='/correction'>Correction</Link>
        </Menu.Item>
        <Menu.Item key='difference'>
          <Link href='/difference'>Difference</Link>
        </Menu.Item>
        <Menu.Item key='translation'>
          <Link href='/translation'>Translation</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navigation;
