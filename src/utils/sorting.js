import {NOW} from '../constants'
import chunk from 'lodash/fp/chunk'
import compose from 'lodash/fp/compose'
import filter from 'lodash/fp/filter'
import get from 'lodash/fp/get'
import moment from 'moment'
import reverse from 'lodash/fp/reverse'
import sortBy from 'lodash/fp/sortBy'

const format = compose(chunk(7), reverse)
const byUpvotes = compose(format, sortBy(get('upvotes')))
const filterWithin = (num, timePeriod) => filter(item => NOW.subtract(num, timePeriod).isBefore(moment(item.createdAt)))

export const liveSort = compose(
  format,
  sortBy(get('createdAtTime'))
)

export const daySort = compose(
  byUpvotes,
  filterWithin(1, 'days')
)

export const weekSort = compose(
  byUpvotes,
  filterWithin(1, 'weeks')
)

export const monthSort = compose(
  byUpvotes,
  filterWithin(1, 'months')
)

export const yearSort = compose(
  byUpvotes,
  filterWithin(1, 'years')
)

export const allTimeSort = byUpvotes
