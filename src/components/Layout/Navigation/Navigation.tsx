import { useState } from 'react';
import Link from 'next/link';
import { MenuOutlined } from '@ant-design/icons';
import { Menu, Button } from 'antd';

const Navigation = () => {
  const [visible, setVisible] = useState(false);

  const handleMenuClick = () => {
    setVisible(!visible);
  };

  return (
    <div className='relative'>
      {/* <Button
        type='primary'
        icon={<MenuOutlined />}
        onClick={handleMenuClick}
      /> */}
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
        <Menu.Item key='translation'>
          <Link href='/translation'>Translation</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navigation;
