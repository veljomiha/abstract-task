import { Dispatch, FC, SetStateAction } from 'react';
import { Tabs } from './Tabs';

const NAV_TABS = [Tabs.ANGULAR, Tabs.REACT, Tabs.VUE];

interface NavbarProps {
  setPage: Dispatch<SetStateAction<number>>;
  activeTab: Tabs | string;
  setActiveTab: Dispatch<SetStateAction<Tabs | string>>;
}

const Navbar: FC<NavbarProps> = ({ setPage, activeTab, setActiveTab }) => (
  <nav className="navbar">
    {NAV_TABS.map(tab => (
      <button
        className={
          activeTab === tab ? 'default-button active-tab' : 'default-button'
        }
        key={tab}
        onClick={() => (
          setActiveTab(tab),
          setPage(1),
          localStorage.setItem('page', `${1}`),
          localStorage.setItem('activeTab', tab)
        )}>
        {tab}
      </button>
    ))}
  </nav>
);

export default Navbar;
