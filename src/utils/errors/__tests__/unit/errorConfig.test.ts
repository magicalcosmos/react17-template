import ErrorFile from '~@/utils/errors/errorConfig';

test('errorConfig 配置测试',()=>{
    expect(ErrorFile).toMatchSnapshot();
})