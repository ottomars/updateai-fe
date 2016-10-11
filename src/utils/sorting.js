import {NOW} from '../constants'
import chunk from 'lodash/fp/chunk'
import compose from 'lodash/fp/compose'
import filter from 'lodash/fp/filter'
import get from 'lodash/fp/get'
import reverse from 'lodash/fp/reverse'
import sortBy from 'lodash/fp/sortBy'

const format = compose(chunk(7), reverse)
const byUpvotes = sortBy(get('upvotes'))
const byCreatedAtTime = sortBy(get('createdAtTime'))
const filterWithin = (num, timePeriod) => filter(item => NOW().subtract(num, timePeriod).isBefore(item.createdAt))

export const liveSort = compose(
  format,
  byCreatedAtTime
)

export const daySort = compose(
  format,
  byUpvotes,
  byCreatedAtTime,
  filterWithin(1, 'days')
)

export const weekSort = compose(
  format,
  byUpvotes,
  byCreatedAtTime,
  filterWithin(1, 'weeks')
)

export const monthSort = compose(
  format,
  byUpvotes,
  byCreatedAtTime,
  filterWithin(1, 'months')
)

export const yearSort = compose(
  format,
  byUpvotes,
  byCreatedAtTime,
  filterWithin(1, 'years')
)

export const allTimeSort = compose(
  format,
  byUpvotes,
  byCreatedAtTime
)
