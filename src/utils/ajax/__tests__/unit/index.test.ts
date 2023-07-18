/* 
//需要使用模拟文件里的函数，可以这么引用
jest.mock('~@/utils/ajax') */
import ajax from '~@/utils/ajax';
import axios from 'axios';

jest.mock('axios')

describe('util ajax',() => {
    test(('getConfig：config里有API_ENDPOINT、WS_ENDPOINT,是否返回{API_ENDPOINT，WS_ENDPOINT}'),()=>{
        //配置信息
        const configEnv = {
            API_ENDPOINT: 'http://10.88.222.104/elephant/api/v1/gql/query',
            WS_ENDPOINT: 'ws://10.88.222.104/elephant/api/v1/ws'
          }
        ajax.config = configEnv;
        return ajax.getConfig().then(data => {
            expect(data).toEqual(configEnv)
        })
    })
    test(('getConfig：config里没有有API_ENDPOINT、WS_ENDPOINT, 接口里enable:true接口里信息'),()=>{
        //配置信息
        const configEnv = {}
        ajax.config = configEnv;
        //接口返回数据里的一部分
        const responseEnv = {
            API_ENDPOINT: 'http://10.88.222.104/elephant/api/v1/gql/query',
            WS_ENDPOINT: 'ws://10.88.222.104/elephant/api/v1/ws99999999'
        }
        //模拟接口返回数据
        axios.get = jest.fn().mockResolvedValue({data:{
            enable:true,
            ...responseEnv
        }});
        return ajax.getConfig().then(data => {
            expect(data).toEqual(responseEnv)
        })
    })
    test(('getConfig：config里没有有API_ENDPOINT、WS_ENDPOINT, 接口里enable:false从配置里取 3、如果上述都没有返回自己设置的'),()=>{
        //配置信息
        const configEnv = {
            API_ENDPOINT: 'http://10.88.222.104/elephant/api/v1/gql/query',
            WS_ENDPOINT: 'ws://10.88.222.104/elephant/api/v1/ws88888'
          }
        ajax.config = configEnv;
        //模拟接口返回数据
        axios.get = jest.fn().mockResolvedValue({data:{
            enable:false
        }});
        return ajax.getConfig().then(data => {
            expect(data).toEqual(configEnv)
        })
    })
    test(('getConfig：config里没有有API_ENDPOINT、WS_ENDPOINT, 如果上述都没有返回自己设置的'),()=>{
        const protocol = window.location.protocol;
        const host = window.location.host;
        //配置信息
        const configEnv = {}
        ajax.config = configEnv;
        //返回结果
        const returnData = {
            API_ENDPOINT: `${protocol}//${host}/elephant/api/v1/gql/query`,
            WS_ENDPOINT: `ws://${host}/elephant/api/v1/ws`
          }
        //模拟接口返回数据
        axios.get = jest.fn().mockResolvedValue({data:{
            enable:false
        }});
        return ajax.getConfig().then(data => {
            expect(data).toEqual(returnData)
        })
    })
})