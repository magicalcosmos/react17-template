import '~@/theme/default/components/TableList.scss';
import React from 'react';
import { Table, Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { IPage, IFilter } from '~@/interface';
import PropTypes from 'prop-types';
/**
 * Commone listing component
 * @param props
   -
   - page
   - button
   - dataSource
   - showTotal
   - 
   - handleSearch
   - handelFilter
 */
function TableList(props: any) {
  /************ initialize *****************/
  if (!props) {
    return <div></div>;
  }
  /* if (!props.dataSource) {
    props.dataSource = [];
  } */

  /************ Variables *****************/

  const { t } = useTranslation();
  //页码
  const pagination = {
    current: props.page.pageIndex || 1,
    pageSize: props.page.pageSize,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: () => {
      return props.showTotal || `${t('pagination.summary')}`.replace('x', props.page ? props.page.total : 0);
    },
    size: 'small',
    total: props?.page ? props.page.total : 0,
    position: ['bottomCenter']
  };

  /************ Events *****************/
  /**
   * Search list content by keyword
   * It triggers by input
   * @param e Event
   */
  function handleSearch(e: Event) {
    props.handleSearch && props.handleSearch(e);
  }

  /**
   * Filter list content in header 
   * It triggers by header filter conditions
   * @param pagination
   * @param filters
   * @param sorter
   */
  function handleFilter(pagination: IPage, filters: IFilter, sorter?: any) {
    props.handleFilter && props.handleFilter(pagination, filters, sorter);
  }
  return <>
    <div className='table-list' >
      <div className='table-list-header' >
        <div className='summary' dangerouslySetInnerHTML={{ __html: props.summary || '' }} ></div>
        <div className='header-right'>
          <span className='search'>
            <i className='iconfont iconsearch'></i>
            <Input onChange={handleSearch} data-testid='searchUser' className='search-input' placeholder={t('search')} role='searchInput'/>
          </span>
          <Button data-testid='addUser' type='primary' onClick={props.button.event} role='createButton'>{props.button.name}</Button>
        </div>
      </div>
      <Table
        data-testid='table-list'
        rowKey={(text: any) => text.id || +new Date()}
        columns={props.columns}
        dataSource={props.dataSource || []}
        pagination={pagination}
        onChange={handleFilter}></Table>
    </div>
  </>;
}
TableList.propTypes = {
  page: PropTypes.shape({
    pageIndex: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number
  }),
  button: PropTypes.shape({
    event: PropTypes.func,
    name: PropTypes.string
  })
};
TableList.defaultProps = {
  page: {
    pageIndex: 1,
    pageSize: 10,
    total: 0
  },
  button: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    event: () => { },
    name: ''
  }
};

export default TableList;
