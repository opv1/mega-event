import React, { Component } from 'react'

import styles from './styles.module.scss'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state

    if (error) {
      return (
        <div className={styles.boundary} data-testid='errorboundary'>
          <span className={styles.title}>Что то пошло не так... ( ˘︹˘ )</span>
          {error.message && (
            <span className={styles.error}>Текст ошибки: {error.message}</span>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
