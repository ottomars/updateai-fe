# UpdateAI Frontend

## Tech Stack

- React/Redux
- Heroku

## Deployment

The app is currently deployed to https://updateai-fe-production.herokuapp.com via the Heroku GitHub integration. Just push new code to `master` to trigger a new deployment.

## Dev environment

Follow the instructions at [create-react-app](https://github.com/facebookincubator/create-react-app) to work on the site locally, but it should be as simple as,

```sh
npm install
npm run start
```

## Editing data content

Site content can be edited via the JSON files located in the `data/` folder.

Before committing changes back to the repo it could be helpful to copy and paste the JSON into a website that can check it for errors. E.g. http://jsonlint.com/

### Index file

The [`index.json`](./data/index.json) file looks something like this,

```json
{
  "live": [
    "amazon",
    "apple",
    "bitcoin",
    "blue-origin",
    "drinks-packaging",
    "google",
    "space-x",
    "tesla",
    "vr"
  ],
  "selected": [
    "apple",
    "amazon",
    "bitcoin"
  ],
  "active": [
    "apple",
    "amazon",
    "bitcoin"
  ]
}
```

- The `live` list references all the feeds that should be available on the site
- The `selected` list references which of those live feeds should appear pre-selected in the feed nav bar
- The `active` list references which of those selected feeds should be active and fully displayed in the main area

### Feed files

Feed files, e.g. [`amazon.json`](./data/amazon.json), contain all the feed items for a particular feed.

Feed files can contain any number of items, and have a structure that looks like this.

```json
{
  "title": "Amazon",
  "items": [
    {
      "text": "Amazon Echo: It's smart, but not quite smart enough",
      "createdAt": "2016-10-03T09:00:00",
      "starred": false,
      "upvotes": 0,
      "uri": "https://medium.com/@rynmcmns/what-will-you-do-in-a-car-when-it-drives-itself-efdac3b6e5a5#.czscuq9w3",
      "image": "http://www.networkedindia.com/wp-content/uploads/2016/05/tim-cook.jpg",
      "comments": [
        ["@JosephTryn", "This was expected. See my post on the wiki for details..."],
        ["@TimPierce", "Do you think they are in trouble? I'm actually quite optimistic."],
        ["@JosephTryn", "They will get over it. Did you see the news on the new product?"]
      ]
    },
    {
      ...
    },
    {
      ...
    }  
  ]
}
```

- Each feed file has a main `title`
- After that comes a list of `items` which each have
  - `text` The main link text/headline
  - `createdAt` A timestamp for the item in the format `YYYY-MM-DDTHH:MM:SS`
  - `starred` True or false
  - `upvotes` Number of upvotes
  - `uri` The clickthrough destination
  - `image` Full hotlinked image URI, or alternatively a path to a locally hosted image
  - `comments` List of user comments, see example above for the format
