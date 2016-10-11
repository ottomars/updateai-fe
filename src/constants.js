import {now} from '../data'
import moment from 'moment'

export const LIVE_SORTING = 'live'
export const DAY_SORTING = 'day'
export const WEEK_SORTING = 'week'
export const MONTH_SORTING = 'month'
export const YEAR_SORTING = 'year'
export const ALL_TIME_SORTING = 'all-time'

export const NOW = () => moment(now)

export const SORT_LABELS = {
  [LIVE_SORTING]: 'Live',
  [DAY_SORTING]: 'Top today',
  [WEEK_SORTING]: 'Top past week',
  [MONTH_SORTING]: 'Top past month',
  [YEAR_SORTING]: 'Top past year',
  [ALL_TIME_SORTING]: 'Top all time'
}
