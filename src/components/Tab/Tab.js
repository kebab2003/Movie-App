import App from '../app';
import TopRated from '../TopRated/TopRated';
import { Tabs } from 'antd';
import { useState } from 'react';
import './Tab.css';
function Tab() {
  const [currentTab, setCurrentTab] = useState(1);
  const items = [
    {
      key: '1',
      label: 'search',
      children: <App />,
    },
    {
      key: '2',
      label: 'rated',
      children: <TopRated currentTab={currentTab} />,
    },
  ];

  return <Tabs onChange={(key) => setCurrentTab(key)} items={items} defaultActiveKey="1" />;
}

export default Tab;
