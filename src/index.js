import React from 'react'
import styles from './styles.scss'
import { Banner as BannerComponent } from './components/Banner'
import { Masthead as MastheadComponent } from './components/Masthead'
import { DotcomShell as DotcomShellComponent } from './components/DotcomShell'

export const Banner = ({ text }) => {
  return <BannerComponent />
}

export const Masthead = (props) => {
  return <MastheadComponent {...props} />
}

export const DotcomShell = (props) => {
  return <DotcomShellComponent {...props} />
}
