'use strict'

import request from 'request'

export function promiseGet (URL, processBody) {
  return new Promise(function (resolve, reject) {
    request.get(URL, function (error, response, body) {
      if (error) {
        reject(Error('error: ' + error))
      } else if (!response) {
        reject(Error('error:' + ' no reponse received'))
      } else if (response.statusCode !== 200) {
        reject(Error('error, statusCode: ' + response.statusCode + ' - response: ' + response))
      } else {
        resolve(processBody(body))
      }
    })
  })
}

export function synchGet (URL, processBody) {
  request.get(URL, function (error, response, body) {
    if (error) {
      return (Error('error: ' + error))
    } else if (!response) {
      return (Error('error:' + ' no reponse received'))
    } else if (response.statusCode !== 200) {
      return (Error('error, statusCode: ' + response.statusCode + ' - response: ' + response))
    } else {
      return (processBody(body))
    }
  })
}
