import {basename} from 'path'
import {DAY_SORTING, NOW} from '../constants'
import {live, selected, active} from '../../data'
import {normalize, Schema, arrayOf} from 'normalizr'
import {parse} from 'url'
import guid from './guid'
import moment from 'moment'

const mods = require.context('../../data', false, /^(?!.*index\.json$).*\.json$/)

/**
 * Make an array of live feeds with the shape,
 *
 * [
 *   {
 *     id: <random guid>,
 *     title: 'Apple',
 *     page: 0,
 *     numPages: 7,
 *     sorting: 'live',
 *     items: [ ... ]
 *   },
 *   ...
 * ]
 */

const feedsArray = mods.keys()
  .map(key => ([key, basename(key, '.json')]))
  .filter(([key, filename]) => live.includes(filename))
  .map(([key, filename]) => ({id: guid(), filename, ...mods(key)}))
  .map(feed => ({
    ...feed,
    page: 0,
    sorting: DAY_SORTING
  }))

const myFeed = {
  filename: 'my-feed',
  id: guid(),
  items: [],
  page: 0,
  sorting: DAY_SORTING,
  title: 'My Feed',
  isMyFeed: true
}

feedsArray.unshift(myFeed)

/**
 * Go through the items of each feed and give them a
 * random guid and some dynamic values.
 */

feedsArray.forEach(feed => {
  feed.items = feed.items.map(item => {
    const createdAt = moment(item.createdAt)
    return {
      ...item,
      image: item.image.startsWith('/') ? `${process.env.PUBLIC_URL}${item.image}` : item.image,
      id: guid(),
      createdAtRel: createdAt.from(NOW),
      createdAtTime: createdAt.valueOf(),
      hostname: parse(item.uri).hostname,
      visited: false
    }
  })
})

/**
 * We want a flat, normalised data structure of feeds
 * and items for Redux.
 */

const feedSchema = new Schema('feeds')

feedSchema.define({
  items: arrayOf(new Schema('items'))
})

const {entities: {feeds, items}} = normalize(feedsArray, arrayOf(feedSchema))

/**
 * Create the selected and active state arrays for the feeds.
 */

selected.unshift('my-feed')
active.unshift('my-feed')

const selectedFeeds = Object.keys(feeds)
  .map(id => feeds[id])
  .filter(feed => selected.includes(feed.filename))
  .map(feed => feed.id)

const activeFeeds = Object.keys(feeds)
  .map(id => feeds[id])
  .filter(feed => active.includes(feed.filename))
  .filter(feed => selectedFeeds.includes(feed.id))
  .map(feed => feed.id)

const initialState = {feeds, items, selectedFeeds, activeFeeds}

export default initialState
