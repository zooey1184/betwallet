import http from './js/http'

// const HOST = 'http://47.242.226.50:7011'
const HOST = ''

export const getConfig = async() => {
  return http.get(`${HOST}/v1/contract/getConfig`)
}

export const getBonusInfo = async() => {
  return http.get(`${HOST}/v1/contract/getBonusInfo`)
}