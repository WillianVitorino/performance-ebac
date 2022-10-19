import http from 'k6/http';
import { group, sleep } from 'k6';
import Login from '../request/login.request';
import data from '../data/usuarios.json'
import User from '../request/user.request';
import Product from '../request/product.request';
import Client from '../request/client.request';

export const options = {
  stages: [
    {duration: '10s', target: 10},
    {duration: '5s', target: 30},
    {duration: '10s', target: 10},
  ],
  thresholds: {
    http_req_duration: ['p(99) < 1000']
  }

}

export default function () {

  let login = new Login()
  let user = new User()
  let product = new Product();
  let client = new Client();

  group('login and get token', () => {
    login.access(data.usuarioOk.user, data.usuarioOk.pass)
  })

  group('list users', () => {
    user.list(login.getToken())
  })

  group('list products', () => {
    product.list(login.getToken())
  })

  group('list products', () => {
    client.list(login.getToken())
  })
}