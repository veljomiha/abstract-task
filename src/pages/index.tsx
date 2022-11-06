import { useEffect, useState } from 'react';
import Cards from '@veljomiha/abstract-task/components/Cards';
import Navbar from '@veljomiha/abstract-task/components/Navbar';
import { Tabs } from '@veljomiha/abstract-task/components/Tabs';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tabs | string>(Tabs.REACT);
  const [page, setPage] = useState<number>(1);
  const childProps = {
    page,
    setPage,
    activeTab,
    setActiveTab,
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pageLocalStorage = localStorage.getItem('page');
      const activeTabLocalStorage = localStorage.getItem('activeTab');
      if (!pageLocalStorage) {
        localStorage.setItem('page', `${1}`);
      } else {
        setPage(Number(localStorage.getItem('page')));
      }
      if (!activeTabLocalStorage) {
        localStorage.setItem('activeTab', activeTab);
      } else {
        setActiveTab(String(localStorage.getItem('activeTab')));
      }
    }
  }, [page, activeTab]);

  return (
    <div className="container">
      <Navbar {...childProps} />
      <Cards {...childProps} />
    </div>
  );
}
