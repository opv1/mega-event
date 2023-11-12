import React, { memo } from 'react'

import styles from './styles.module.scss'

export const NotFound = memo(() => {
  return <h2 className={styles.title}>Такой страницы нет</h2>
})
