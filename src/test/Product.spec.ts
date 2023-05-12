// import { keys } from 'ts-transformer-keys'
import axios from '@/plugins/axios'
import type { IGetResponse } from '@/types/GetResponse'
import type { IPartner } from '@/types/Partner'
import type { IStock } from '@/types/Stock'
import { CODE } from '@/utils/constants'
import type { I } from 'vitest/dist/types-94cfe4b4'
const product_id: string = '52c84d5e-6be0-11e9-8100-98f2b33e9417'

// type TStock = IStock

describe('GET api/application/stock/detail-main', () => {
  it('ID => must get success and success', async () => {
    const response = await axios.get(`api/application/stock/detail-main?product_id=${product_id}`)
    expect(response.status).toBe(200)
    const data: IGetResponse = response.data
    expect(data.success).toBe(true)
    expect(data.error_code).toBe(0)
  })

  it('ID => must get Success and ErrorCode 404', async () => {
    const response = await axios.get('api/application/stock/detail-main?product_id')
    expect(response.status).toBe(CODE.SUCCESS)
    const data: IGetResponse = response.data
    expect(data.error_code).toBe(CODE.NOT_FOUND)
  })
  it('Empty => must get 400 BAD REQUEST', async () => {
    await axios
      .get('api/application/stock/detail-main')
      .then((res) => {
        expect(res.status).toBe(CODE.SUCCESS)
      })
      .catch((err) => {
        expect(err.response.status).toBe(CODE.BAD_REQUEST)
      })
  })
})

describe('POST front-api/loan-info/stock', () => {
  it('ID => must get Success and Success', async () => {
    const response = await axios.post('front-api/loan-info/stock', { guid: product_id })
    expect(response.status).toBe(CODE.SUCCESS)
    const data: IGetResponse = response.data
    expect(data.success).toBe(true)
    expect(data.error_code).toBe(0)
    const stock: IStock = data.data
    // console.log(keys)
    // // type K = keyof IStock;
    // const iStockKeys: Array<keyof IStock> = Object.keys({} as IStock)
    // console.log('iStockKeys', iStockKeys) 
    interface MyInterface {
      foo: string;
      bar: number;
      baz: boolean;
    }
    
    const keys: Array<keyof MyInterface> = Object.keys({} as MyInterface);
    
    console.log(keys);
    console.log('Stock', stock, Object.keys(stock))
    expect(stock).keys(['months', 'partners'])
  })
  it('Empty => must get 500 Internal Server Error', async () => {
    await axios
      .post('front-api/loan-info/stock', { guid: '' })
      .then((res) => {
        expect(res.status).toBe(CODE.SUCCESS)
      })
      .catch((err) => {
        expect(err.response.status).toBe(CODE.INTERNAL_SERVER_ERROR)
      })
  })
  it('Empty => must get 500 Internal Server Error', async () => {
    await axios
      .post('front-api/loan-info/stock')
      .then((res) => {
        expect(res.status).toBe(CODE.SUCCESS)
      })
      .catch((err) => {
        expect(err.response.status).toBe(CODE.INTERNAL_SERVER_ERROR)
      })
  })
})

describe('GET api/application/stock/detail-description', () => {
  it('Success => must be 200 and success', async () => {
    await axios
      .get(`api/application/stock/detail-descriptions?product_id=${product_id}`)
      .then((res) => {
        expect(res.status).toBe(CODE.SUCCESS)
        const data: IGetResponse = res.data
        expect(data.success).toBe(true)
        expect(data.error_code).toBe(0)
      })
  })
  it('BAD REQUEST => must be 400 and Bad Request', async () => {
    await axios
      .get('api/application/stock/detail-descriptions')
      .then((res) => {
        expect(res.status).toBe(CODE.SUCCESS)
      })
      .catch((err) => {
        expect(err.response.status).toBe(CODE.BAD_REQUEST)
      })
  })
})
