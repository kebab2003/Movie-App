import Tab from './components/Tab';
import { GenresProvider } from './components/Genres/Genres';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GenresProvider>
      <Tab />
    </GenresProvider>
  </React.StrictMode>
);
