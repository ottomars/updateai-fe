import chunk from 'lodash/fp/chunk'
import compose from 'lodash/fp/compose'
import get from 'lodash/fp/get'
import reverse from 'lodash/fp/reverse'
import sortBy from 'lodash/fp/sortBy'

export const paginate = chunk(7)

export const liveSort = compose(
  paginate,
  reverse,
  sortBy(get('createdAtTime'))
)
