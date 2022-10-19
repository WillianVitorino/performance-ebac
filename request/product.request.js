import { check } from 'k6'
import http from 'k6/http'
import Utils from '../utils/utils'

export default class Product{
    list(token){
        let response =  http.get(`${Utils.getBaseUrl}products`, {
            headers: {
                Authorizarion: `Bearer ${token}`
            }
        })
        check(response, {'Deve retornar 200': r => r && r.status === 200})
    }
}