# Watson Data Kits - knowledge-kits-nodejs

NodeJS library for Watson Data Kits (insert link here).

## Installation
Node v6.10 (or later) and npm are required. (`brew upgrade && brew install node`)

Install node modules with `npm install`

npm install datakits

## Usage

First, setup the client:
```
var travel = require('../lib/datakits');

var client = new travel.DatakitClient();

var params = {
    'location': '37.7749,-122.4194',
    'category': 'landmarks'
}

client.authorize(
  '<PROVIDED ACCESS TOKEN URL>',
  '<PROVIDED API URL>',
  '<YOUR API KEY>',
  '<YOUR INSTANCE ID>',

  function() {
    // Get attractions
    client.getAttractions(params, function(error, data){
      console.log(data);
    });

    // Get categories
    client.getCategories(function(error, data){
      console.log(data);
    });

    // Get countries
    client.getCountries(function(error, data){
      console.log(data);
    });

    // Get the name of the first country
    client.getCountries(function(error, data){
      console.log(data.results[0].name);
    });

    // Get concepts
    client.getConcepts(function(error, data){
      console.log(data);
    });

    // Get entities
    client.getEntities(function(error, data){
      console.log(data);
    });

    // Get keywords
    client.getKeywords(function(error, data){
      console.log(data);
    });
  }
);
```

Endpoints are implemented as methods on the `datakits` object. 

Current available endpoints include:

attractions : lists available attractions by location and category.

categories : lists available categories that can be searched against and the number of attractions at each location.

countries : lists general data on all the countries where the attractions can be found.

concepts : lists general information on the concepts associated with attractions at this location.

entities : lists general information on the entities associated with attractions at this location.

keywords : lists general information on the keywords associated with attractions at this location.
