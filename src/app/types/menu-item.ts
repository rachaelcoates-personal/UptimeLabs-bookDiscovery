/* eslint-disable @typescript-eslint/no-unused-vars */
interface MenuItem {
    name: string;
    icon: React.ReactNode;
    link: string;
    tooltip?: string;
    subItems?: MenuItem[];
    
  }