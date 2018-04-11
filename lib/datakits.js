var request = require('request'),
    querystring = require('querystring');

/**
 * Constructs a new instance of the DatakitClient class.
 *
 * @constructor
 * @this {DatakitClient}
 */
function DatakitClient() {
  var xAuthToken = null;
  var xInstanceId = null;
  var xApiURL = null;

  var _this = this;

  /**
   * Helper for getting the request object.
   *
   * @param path {String} path the relative URI path
   * @param type {String} type of request: 'auth' or 'data'
   * @param data {Object} an object of extra values
   */
  var getRequestOptions = function(path, type, data) {

    if (xApiURL == null) {

      var data = {
        'grant_type': 'urn:ibm:params:oauth:grant-type:apikey',
        'apikey': data.api_key
      }

      var options = {
        url: path,
        form: data,
        timeout: 120000,
        strictSSL: true,
        json: true
      };

    } else {

      var headers = {
        'Authorization': 'Bearer ' + xAuthToken, 
        'Instance-ID': xInstanceId
      }

      var params = querystring.stringify(data.params);

      var options = {
        url: xApiURL + "/" + path + "?" + params,
        headers: headers,
        timeout: 120000,
        json: data
      };
    }

    options.headers = headers;

    return options;
  };

  /**
   * Issues a GET request to the datakit API.
   *
   * @param {String} path the relative path
   * @param {String} type of request: 'auth' or 'data'
   * @param {Object} data an object containing extra values
   * @param {Function} callback the callback to invoke when the request completes
   */
  var datakitGet = function(path, type, data, callback) {
    var opts = getRequestOptions(path, type, data);
    opts.method = 'GET';
    request(opts, callback);
  };

  /**
   * Issues a POST request to the datakit API.
   *
   * @param {String} path the relative path
   * @param {String} type of request: 'auth' or 'data'
   * @param {Object} data an object containing extra values
   * @param {Function} callback the callback to invoke when the request completes
   */
  var datakitPost = function(path, type, data, callback) {
    var opts = getRequestOptions(path, type, data);
    opts.method = 'POST';
    request(opts, callback);
  };

  /**
   * Helper for transforming the request callback values.
   *
   * @param {Function} callback the callback
   */
  var makeDatakitCallback = function(callback) {
    return function(error, res, body) {
      var data = null;

      if (!error) {
        if (typeof body === "string")
        {
          try
          {
            data = JSON.parse(body);
          } catch (err) {
            // todo
          }
        }
        else if (typeof body === "object") {
          data = body;
        }
      }

      if (callback) {
        callback(error, data);
      }
    };
  };

  /**
   * Authorize this datakit client.
   *
   * @param {String} auth URL. The URL used to authenticate the user
   * @param {String} api URL. The URL used to make API calls
   * @param {String} api key. This will be used to obtain the access token
   * @param {String} instance id.
   * @param {Function} callback the callback to invoke when the request completes
   */
  this.authorize = function(authURL, apiURL, apiKey, instanceId, callback) {
    datakitPost(authURL, 'auth',
      { 
        api_key: apiKey,
        instance_id: instanceId
      },
      function(error, res, body) {
        if (!error && body.access_token) {
          xAuthToken = body.access_token;
          xInstanceId = instanceId;
          xApiURL = apiURL.replace(/\/$/, "");
          _this.expires = body.expiration; 
          _this.defaults = body;
          callback(error, res, body);
        } else if (body.error){
          throw "Failed to authenticate: " + body.error;
        }
      });
  };

  /**
   * Returns whether this client is authorized
   * @return whether or not this client is authorized
   */
  this.isAuthorized = function() {
    return xAuthToken != null;
  }
 
  /**
   * Returns the xAuthToken
   * @return xAuthToken
   */
  this.getAuthToken = function() {
    return xAuthToken || null;
  }

  /**
   * Gets a list of categories.
   *
   * @param {Function} callback the callback to invoke when the request completes
   */
  this.getCategories = function(callback) {
    datakitGet('v1/categories', 'data',
      {
      },
      makeDatakitCallback(callback));
  };

  /**
   * Gets a list of countries.
   *
   * @param {Function} callback the callback to invoke when the request completes
   */
  this.getCountries = function(callback) {
    datakitGet('v1/countries', 'data',
      { 
      },
      makeDatakitCallback(callback));
  };

  /**
   * Gets a list of attractions.
   *
   * @param {Function} callback the callback to invoke when the request completes
   */
  this.getAttractions = function(params, callback) {
    datakitGet('v1/attractions', 'data',
      {
        params: params
      },
      makeDatakitCallback(callback));
  };

  /**
   * Gets a list of concepts.
   *
   * @param {Function} callback the callback to invoke when the request completes
   */
  this.getConcepts = function(params, callback) {
    datakitGet('v1/concepts', 'data',
      {
        params: params
      },
      makeDatakitCallback(callback));
  };

  /**
   * Gets a list of entities.
   *
   * @param {Function} callback the callback to invoke when the request completes
   */
  this.getEntities = function(params, callback) {
    datakitGet('v1/entities', 'data',
      {
        params: params
      },
      makeDatakitCallback(callback));
  };

  /**
   * Gets a list of keywords.
   *
   * @param {Function} callback the callback to invoke when the request completes
   */
  this.getKeywords = function(params, callback) {
    datakitGet('v1/keywords', 'data',
      {
        params: params
      },
      makeDatakitCallback(callback));
  };

}

exports.DatakitClient = DatakitClient;
