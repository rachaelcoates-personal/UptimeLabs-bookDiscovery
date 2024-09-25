import Link from 'next/link';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { menuItems } from '@/app/helpers/constants';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import styles from './styles.module.scss';

export const MenuItems = () => {
    const activeMenuItemColor = 'rgba(0, 0, 0, 0.08)'
    const pagePath = usePathname();

    const RenderedItem = (item: MenuItem) => {
        return RenderdMenuItem(item)
    }

    const renderIcon = (icon: ReactNode) => {
        switch (icon) {
            case 'Arrow': return <ArrowForwardIosIcon fontSize='small' />;
            case 'Manage': return <ManageAccountsIcon fontSize='medium' />
            case 'Book': return <MenuBookIcon fontSize='medium' />
        }
    }


    const RenderdMenuItem = (item: MenuItem) => {
        const activeLink = pagePath === item.link

        let renderedItem = (
            <Link className={styles.link} href={item.link} key={item.name}>
                <ListItem disablePadding sx={{ background: activeLink ? activeMenuItemColor : '' }}>
                    <ListItemButton>
                        <ListItemIcon>
                            {renderIcon(item.icon)}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItemButton>
                </ListItem>
            </Link>
        )

        // Adding tooltip to the menu item
        if (item.tooltip) {
            renderedItem = (
                <Tooltip key={item.name} title={item.tooltip} placement="right-start">
                    {renderedItem}
                </Tooltip>
            )
        }
        return renderedItem
    }

    return (
        <List>
            {menuItems.map((item: MenuItem) => (
                RenderedItem(item)
            ))}
        </List>
    )
}