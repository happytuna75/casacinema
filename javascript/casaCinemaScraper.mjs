'use strict'

import * as httpClient from './httpClient'
import * as cheerio from 'cheerio'

const casacinemaURL = 'https://www.casacinema.video'

var scrapeCategories = function (htmlBody) {
  let categories = []
  var $ = cheerio.default.load(htmlBody)
  $('div.container.home-cats ul li a').each(function (index, element) {
    let categoryLink = $(element).attr('href')
    categoryLink.startsWith('/') || (categoryLink = '/' + categoryLink)
    categories.push({
      slug: $(element).text(),
      link: casacinemaURL + categoryLink
    })
  })
  return categories
}

var scrapeFilmsOfCategoryPage = function (categoryLink, pageNumber, films) {
  httpClient.synchGet(buildGategoryPageLink(categoryLink, pageNumber), function(htmlBody) {
    var $ = cheerio.default.load(htmlBody)
    // scrapes films in this page
    $('').each(function (index, element) {
      // get data of a new film
      films.push({})
    })
    // if possible go to next page
    if () scrapeFilmsOfCategoryPage(categoryLink, pageNumber++, films)
  })
}
  
var fetchFilmsOfCategory = function (category) {
  let films = []
  scrapeFilmsOfCategoryPage(category.link, 0, films)
  return films;
}

export function fetchCategories () {
  return new Promise(function (resolve, reject) {
    httpClient.promiseGet(casacinemaURL, scrapeCategories).then(function (categories) {
      resolve(categories)
    }, function (error) {
      reject(error)
    })
  })
}

export function fetchFilms (categories) {
  return new Promise(function (resolve, reject) {
    // TODO fetches all films of all categories
    let films = []
    categories.forEach(category => {
      let filmsOfCategory = fetchFilmsOfCategory(category) 
      films.push(filmsOfCategory)
    });

    if (!error) {
      resolve(films)
    } else {
      reject(error)
    }
  })
}
