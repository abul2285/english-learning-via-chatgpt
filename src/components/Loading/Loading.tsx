import React from 'react';
import { Spin } from 'antd';

export const Loading: React.FC = () => (
  <div
    style={{
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'grid',
      position: 'fixed',
      placeContent: 'center',
    }}
  >
    <Spin size='large' />
  </div>
);
