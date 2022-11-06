import { useState } from 'react';
import Cards from '@veljomiha/abstract-task/components/Cards';
import Navbar from '@veljomiha/abstract-task/components/Navbar';
import { Tabs } from '@veljomiha/abstract-task/components/Tabs';

export default function Home() {
  const [activeTab, setActiveTab] = useState(Tabs.REACT);
  const [page, setPage] = useState(1);
  const childProps = {
    page,
    setPage,
    activeTab,
    setActiveTab,
  };
  return (
    <div className="container">
      <Navbar {...childProps} />
      <Cards {...childProps} />
    </div>
  );
}
