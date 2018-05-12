var request = require('request')
var cheerio = require('cheerio')

const casacinemaURL = 'https://www.casacinema.video'

var listOfCategories = null
var filmsByCategory = {}

var fetchListOfCategories = new Promise(function (resolve, reject) {
  let categories = []
  request.get(casacinemaURL, function (error, response, body) {
    if (error) {
      console.log('error:', error)
      reject(error)
    } else if (!response) {
      console.log('error:' + ' no reponse received')
      reject(Error('no reponse received'))
    } else if (response.statusCode !== 200) {
      console.log('statusCode: ' + response.statusCode + ' - response: ' + response)
      reject(Error(response.statusCode + '  ' + response))
    } else {
      var $ = cheerio.load(body)
      $('div.container.home-cats ul li a').each(function (index, element) {
        let categoryLink = $(element).attr('href')
        categoryLink.startsWith('/') || (categoryLink = '/' + categoryLink)
        categories.push({
          slug: $(element).text(),
          link: casacinemaURL + categoryLink
        })
      })
      resolve(categories)
    }
  })
})

var categoriesPromise
var getFilmsOfCategoryAtIndex = function (categoryIndex) {
  categoriesPromise = categoriesPromise || fetchListOfCategories

  return categoriesPromise.then(function (listOfCategories) {
    if (categoryIndex < listOfCategories.length) {
      // fetch films of category at index i
      console.log('fetching films of category ' + categoryIndex + ': ' + listOfCategories[categoryIndex].slug)
      getFilmsOfCategoryAtIndex(categoryIndex + 1)
    }
  }, function (error) {
    console.log(error)
    return []
  })
}

getFilmsOfCategoryAtIndex(0)
