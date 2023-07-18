import commonUtils from '~@/utils/common';
const historiesByPageSchema = (params) => {
  commonUtils.replaceSpecialCharacters(params);
  // 历史记录
  const schema = `query historiesByPage{
    historiesByPage(paging: {pageIndex:${params.pageIndex},pageSize:${params.pageIndex},sortKey:"CreateAt",isAsc:false},filters:{historyType:${params.historyType},keyID:"${params.keyID}"}){
          edge{
              id
              log
              createBy
              timeStamp
              actionType
              actionParam{
                  key
                  value
                }
              }
          total
    }
  }
  `;
  return schema;
};

const clearHistoryRecordSchema = (params: any) => {
  commonUtils.replaceSpecialCharacters(params);
  // 历史记录
  const schema = `mutation clearHistoryRecord{
    clearHistoryRecord(id:"${params.id}",type:${params.type})
  }
  `;
  return schema;
};

export { historiesByPageSchema, clearHistoryRecordSchema };
