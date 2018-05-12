var request = require('request')
var cheerio = require('cheerio')

const casacinemaURL = 'https://www.casacinema.video'

var casaCinemaDataFetcher = {
  categories: [],
  scraper: function (error, response, body) {
    if (error) {
      console.log('error:', error)
    } else if (!response) {
      console.log('error:' + ' no reponse received')
    } else if (response.statusCode !== 200) {
      console.log('statusCode: ' + response.statusCode + ' - response: ' + response)
    } else {
      var $ = cheerio.load(body)
      $('div.container.home-cats ul li a').each(function (index, element) {
        let categoryLink = $(element).attr('href')
        categoryLink.startsWith('/') || (categoryLink = '/' + categoryLink)
        this.categories.push({
          slug: $(element).text(),
          link: casacinemaURL + categoryLink
        })
      }.bind(this))
      console.log(JSON.stringify(this.categories))
    }
  }
}

console.log('fetching categories from: ' + casacinemaURL)
request.get(casacinemaURL, casaCinemaDataFetcher.scraper.bind(casaCinemaDataFetcher))
