import {basename} from 'path'
import {ITEMS_PER_LANE_PAGE, LIVE_SORTING} from '../constants'
import {live, selected, active} from '../../data'
import {normalize, Schema, arrayOf} from 'normalizr'
import guid from './guid'

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
    numPages: Math.ceil(feed.items.length / ITEMS_PER_LANE_PAGE),
    sorting: LIVE_SORTING
  }))

/**
 * Go through the items of each feed and give them a
 * random guid too.
 */

feedsArray.forEach(feed => {
  feed.items = feed.items.map(item => ({id: guid(), ...item}))
})

/**
 * We want to a flat, normalised data structure of feeds
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

const selectedFeeds = Object.keys(feeds)
  .map(id => feeds[id])
  .filter(feed => selected.includes(feed.filename))
  .map(feed => feed.id)

const activeFeeds = Object.keys(feeds)
  .map(id => feeds[id])
  .filter(feed => active.includes(feed.filename))
  .map(feed => feed.id)

const initialState = {feeds, items, selectedFeeds, activeFeeds}

export default initialState