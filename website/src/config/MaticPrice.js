
import axios from "axios";

const axios = require('axios');

let response = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=Matic', {
      headers: {
        'X-CMC_PRO_API_KEY': '6a77fbea-7ef0-48c7-9606-d6f09c058135',
      },
    });
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const json = response.data;
    console.log(json);
    resolve(json);
  }
});

function ValueCrypto(crypto) {
    // This is from https://gist.github.com/tanaikech/70503e0ea6998083fcb05c6d2a857107
    String.prototype.addQuery = function(obj) {
      return this + Object.keys(obj).reduce(function(p, e, i) {
        return p + (i == 0 ? "?" : "&") +
          (Array.isArray(obj[e]) ? obj[e].reduce(function(str, f, j) {
            return str + e + "=" + encodeURIComponent(f) + (j != obj[e].length - 1 ? "&" : "")
          },"") : e + "=" + encodeURIComponent(obj[e]));
      },"");
    }
  
    var url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"; // or var url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
    var query = {
      symbol: crypto,
      start: 1,
      limit: 5000,
      convert: 'EUR'
    };
    var endpoint = url.addQuery(query); // <--- https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?symbol=###&start=1&limit=5000&convert=EUR
  
    var response = UrlFetchApp.fetch(endpoint, {headers: {'X-CMC_PRO_API_KEY': 'myapikey', 'Accept': 'application/json'}});
    return response.getContentText();
  }