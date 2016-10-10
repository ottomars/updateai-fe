import './index.css'
import {
  LIVE_SORTING,
  DAY_SORTING,
  WEEK_SORTING,
  MONTH_SORTING,
  YEAR_SORTING,
  ALL_TIME_SORTING
} from '../../constants'
import cn from 'classnames'
import React from 'react'

const buttonsData = [
  ['live', LIVE_SORTING],
  ['24h', DAY_SORTING],
  ['week', WEEK_SORTING],
  ['month', MONTH_SORTING],
  ['year', YEAR_SORTING],
  ['all time', ALL_TIME_SORTING]
]

const SortButton = ({label, sorting, selected, onSortButtonClick}) => (
  <a
    className={cn('FeedSorting-button', {'is-selected': selected})}
    onClick={e => {
      e.preventDefault()
      onSortButtonClick(sorting)
    }}
  >{label}</a>
)

const FeedSorting = ({sorting, onSortButtonClick}) => (
  <div className='FeedSorting'>
    <p className='FeedSorting-info'>Sort by /</p>
    {buttonsData.map(button => (
      <SortButton
        key={button[1]}
        label={button[0]}
        sorting={button[1]}
        selected={button[1] === sorting}
        onSortButtonClick={onSortButtonClick}
      />
    ))}
  </div>
)

export default FeedSorting
