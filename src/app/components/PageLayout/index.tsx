import { Header, SideMenu } from '../index'
import { Fragment, useEffect, useState } from 'react'
import {  useMobile } from '../Hooks'
import { screens } from '@/app/helpers/constants'
import styles from './styles.module.scss'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PageLayoutProps {
  children: React.ReactNode,
  paddingRight?: boolean,
  noPaddingMobile?: boolean,
  hideLoader?: boolean
}

export default function PageLayout({ children, paddingRight, noPaddingMobile }: PageLayoutProps) {

  const [openSideMenu, setOpenSideMenu] = useState(false)
  const layoutBreakpoint = useMobile(screens.tablet)

  useEffect(() => {
    const onResize = () => {
      setOpenSideMenu(window.innerWidth > screens.tablet)
    }

    onResize()

    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
    }
  }, [])

  return (
    <Fragment>
      <Header openSideMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu} />
        <SideMenu open={openSideMenu} setOpen={setOpenSideMenu} layoutBreakpoint={layoutBreakpoint} />

        <div className={`${styles.pageLayout} ${paddingRight && 'page-padding-right'} appear-animation`}>
          <main className={`${styles.main} ${noPaddingMobile && 'page-no-padding-mobile'}`}>
            { children }
          </main>
        </div>
        <ToastContainer />
    </Fragment>
  )
}