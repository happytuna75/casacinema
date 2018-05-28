'use strict'

import * as casaCinemaScraper from './javascript/casaCinemaScraper'

// fetches the categories
casaCinemaScraper.fetchCategories.then(function (categories) {
  console.log(categories)
  // TODO store the categories in the DB
  // fetches the films
  casaCinemaScraper.fetchFilms(categories).then(function (films) {
    // TODOstore the films in the DB
  }, function (error) {
    console.log('error while fetching films: ' + error)
  })
}, function (error) {
  console.log('error while fetching categories: ' + error)
})
