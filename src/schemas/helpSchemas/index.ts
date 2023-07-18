const FAQSchema = () => {
  // 帮助faq
  const schema = `query usersByPage {
  usersByPage(paging:{pageIndex:1,pageSize:2}) {
    edge{
      id
      name
    }
    pageInfo{
      pageSize
    }
    total
    }
  }
  `;
  return schema;
};
export { FAQSchema };
