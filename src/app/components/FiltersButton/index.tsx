import { Fragment } from 'react'
import { Button } from '@mui/material'
import { GridFilterListIcon } from '@mui/x-data-grid'
import styles from './styles.module.scss'

interface FiltersButtonProps {
  openFilters: (open: boolean) => void,
  count: number | null
}

export default function FiltersButton({ openFilters, count }: FiltersButtonProps) {
  return (
    <Fragment>
      { !!count && 
        <div className={styles.countHolder}>
          <div className={styles.count}>
            { count }
          </div>
        </div>
      }

      <Button
        startIcon={<GridFilterListIcon fontSize='large' />}
        onClick={() => openFilters(true)}
      >
        Filters
      </Button>
    </Fragment>
  )
}