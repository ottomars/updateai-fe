import {basename} from 'path'
import {ITEMS_PER_LANE_PAGE, LIVE_SORTING} from '../constants'
import {liveFeeds, selectedFeeds, inLaneFeeds} from '../../data'
import {normalize, Schema, arrayOf} from 'normalizr'
import guid from './guid'

const feed = new Schema('feeds')
const item = new Schema('items')

feed.define({
  items: arrayOf(item)
})

const mods = require.context('../../data', false, /^(?!.*index\.json$).*\.json$/)

const feeds = mods.keys()
  .map(key => ([key, basename(key, '.json')]))
  .filter(([key, id]) => liveFeeds.includes(id))
  .map(([key, id]) => ({id, ...mods(key)}))

feeds.forEach(feed => {
  feed.items = feed.items.map(item => ({id: guid(), ...item}))
})

const normalised = normalize(feeds, arrayOf(feed))

const lanes = feeds.reduce((acc, feed) => {
  const id = guid()
  return {
    ...acc,
    [id]: {
      id,
      feed: feed.id,
      page: 0,
      numPages: Math.ceil(feed.items.length / ITEMS_PER_LANE_PAGE),
      sorting: LIVE_SORTING
    }
  }
}, {})

const selectedLanes = Object.keys(lanes)
  .map(key => lanes[key])
  .filter(lane => inLaneFeeds.includes(normalised.entities.feeds[lane.feed].id))
  .map(lane => lane.id)

export default () => (
  {
    feeds: normalised.entities.feeds,
    items: normalised.entities.items,
    lanes,
    selectedFeeds,
    selectedLanes
  }
)
