import { ReactNode } from 'react';

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return <aside className="sidebar">{children}</aside>;
};

export default Sidebar;
