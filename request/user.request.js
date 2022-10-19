import { check } from 'k6'
import http from 'k6/http'
import Utils from '../utils/utils'

export default class User{
    list(token){
        let response =  http.get(`${Utils.getBaseUrl}users`, {
            headers: {
                Authorizarion: `Bearer ${token}`
            }
        })
        check(response, {'Deve retornar 200': r => r && r.status === 200})
    }
}