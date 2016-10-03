import {basename} from 'path'
import {normalize, Schema, arrayOf} from 'normalizr'
import data from '../../data'
import guid from './guid'

const feed = new Schema('feeds')
const item = new Schema('items')

feed.define({
  items: arrayOf(item)
})

const mods = require.context('../../data', false, /^(?!.*index\.json$).*\.json$/)

const feeds = mods.keys()
  .map(key => ([key, basename(key, '.json')]))
  .filter(([key, id]) => data.live.includes(id))
  .map(([key, id]) => ({id, ...mods(key)}))

feeds.forEach(feed => {
  feed.items = feed.items.map(item => ({id: guid(), ...item}))
})

const normalised = normalize(feeds, arrayOf(feed))

export default () => (
  {
    feeds: normalised.entities.feeds,
    items: normalised.entities.items,
    selectedFeeds: data.selected,
    activeFeeds: data.active
  }
)
