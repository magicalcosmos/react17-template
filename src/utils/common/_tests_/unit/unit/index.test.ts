import Common from '~@/utils/common'

//初始化写在这里
beforeAll(()=>{
  
})

//每个测试执行前执行
beforeEach(()=>{

})

//所有测试执行完后执行
afterAll(()=>{

})

describe('util common 测试',() =>{
    test('randomPassword 随机密码不传参数，默认应该是6位',()=>{
        const randomPasswordLength = Common.randomPassword();
        expect(randomPasswordLength.length).toBe(6)
    })
    test('randomPassword 随机密码参数为12，应返回12位数字',()=>{
        const randomPasswordLength = Common.randomPassword(12);
        expect(randomPasswordLength.length).toBe(12)
    })
    test('genUUID 1、index==14内容为4； 2、index==8、13、18、23内容为-  3、index==19内容为',()=>{
        const randomPasswordLength = Common.genUUID();
        expect(randomPasswordLength[14]).toBe('4');
        expect(randomPasswordLength[8]).toBe('-');
        expect(randomPasswordLength[13]).toBe('-');
        expect(randomPasswordLength[18]).toBe('-');
        expect(randomPasswordLength[23]).toBe('-');
    })
    test('getEnv 判断返回的对象是否正确',()=>{
        const env = {
            "BASE_ADDRESS": "10.88.222.104/elephant/api/v1",
            "API_ENDPOINT": "http://10.88.222.104/elephant/api/v1/gql/query",
            "WS_ENDPOINT": "ws://10.88.222.104/elephant/api/v1/ws",
            "STATIC_ENDPOINT": "http://10.88.222.104/elephant",
            "SSO": {
                "CLIENT_ID": "websso",
                "API": "/info",
                "TOKEN_TYPE": "Bearer",
                "RESPONSE_TYPE": "token"
            }
        }
        expect(Common.getEnv()).toEqual(env)
    })
    test('getURLParams url不带参数是否返回空',() => {
        window.location.href='https://www.taobao.com'
        expect(Common.getURLParams()).toEqual({})
    })
    test('getURLParams url带多个参数是否返回对应参数个数',() => {
        window.location.href='https://www.taobao.com/?id=123123&name=lucy&age=18'
        /* const paramsObject = {
            id:'123123',
            name:'lucy',
            age:'18'
        } */
        let paramsObject = Common.getURLParams()
        setTimeout(() => {
            expect(Object.keys(paramsObject).length).toEqual(3)
        }, 0);
    })
    test('formatDateTime 判断返回格式是否正确',()=>{
        let time = new Date().getTime()
        //判断格式为'yyyy-mm-dd hh:mm'
        let formateDate1 = Common.formatDateTime(time,'yyyy-mm-dd hh:mm',1)
        let patt1 = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/g;
        expect(patt1.test(formateDate1)).toBeTruthy();
        //判断格式为'yyyy/mm/dd hh:mm'
        let formateDate2 = Common.formatDateTime(time,'yyyy/mm/dd hh:mm',1)
        let patt2 = /\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}/g;
        expect(patt2.test(formateDate2)).toBeTruthy();
        //判断格式为'yyyy/mm/dd hh:mm:ss'
        let formateDate3 = Common.formatDateTime(time,'yyyy/mm/dd hh:mm:ss',1)
        let patt3 = /\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}/g;
        expect(patt3.test(formateDate3)).toBeTruthy();
        //随意传日期格式参数，返回是否为''yyyy-mm-dd hh:mm:ss'
        let formateDate4 = Common.formatDateTime(time,'asd',1)
        let patt4 = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/g;
        expect(patt4.test(formateDate4)).toBeTruthy();
    })
    test('getFileExtName 获取文件后缀名',() => {
        let ext = 'txt'
        let extName = Common.getFileExtName(`abc.${ext}`)
        expect(extName).toBe(ext)
    })
    test('isNumber 判断是否是数字:1、是数字返回true 2、不是数字返回false',()=>{
        let isNumber1 = Common.isNumber('123.90')
        expect(isNumber1).toBeTruthy();
        let isNumber2 = Common.isNumber('-123.90')
        expect(isNumber2).toBeTruthy();
        let isNumber = Common.isNumber('abd')
        expect(isNumber).toBeFalsy();
    })
    test('replaceSpecialCharacters 替换参数:1、参数为排除列表里的 2、参数为正常要转换的',()=>{
        let params =JSON.stringify("{'reqs':'reqs','name':'zhangsan'}") 
        let afterParams = Common.replaceSpecialCharacters(JSON.parse(params))
        expect(afterParams).toEqual(JSON.parse(params))
    })
    /* //只执行这一个测试用例
    test.only('只执行这一个测试用例',()=>{
       console.log('only')
    }) */
})