/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import {links}  from '@/app/helpers/constants';
import styles from './styles.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface HeaderProps {
  openSideMenu: boolean;
  setOpenSideMenu: (open: boolean) => void;
}

const iconsStyle = {
  color: 'white',
  cursor: 'pointer'
}

export default function Header({ openSideMenu, setOpenSideMenu }: HeaderProps) {

  const onHamburgerClick = () => {
    setOpenSideMenu(!openSideMenu)
  }

  return (
    <div className={styles.header}>
      <div className={styles.hamburgerButton} onClick={onHamburgerClick}>
        { openSideMenu ? <CloseIcon sx={iconsStyle} /> : <MenuIcon sx={iconsStyle} /> } 
      </div>

      <div className={styles.logoHolder}>
        <Link href={links.home}>
          <img className={styles.logo} src={`/images/logo.png`} alt="logo" />
        </Link>
      </div>

    </div>
  )
}