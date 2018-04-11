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
