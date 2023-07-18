import '~@/theme/default/components/SearchInput.scss';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

function SearchInput(props:any) {
  //获取国际化文案
  const { t } = useTranslation();
  const refFindInput = useRef();
  const [isShowInput, setIsShowInput] = useState(false);

  let timer:any = null;

  const handleShowInput = () => {
    setIsShowInput(true);
  };
  const handleCloseInput = () => {
    setIsShowInput(false);
    props.handleFindClose();
  };
  const handleFindInput = (e: Event) => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimeout(() => {
      
      props.handleFindInput(e.target['value']);
      clearTimeout(timer);
      timer = null;
    }, 200);
  };
  const handleFindNext = () => {
    const inputValue = refFindInput.current.value;
    if (inputValue) {
      props.handleFindNext();
    }
    
    /* if (this.$refs.refFindInput['value']) {
      this.$refs.refRCodeEditor['findForward']();
    } */
  };
  const handleFindPrev = () => {
    const inputValue = refFindInput.current.value;
    if (inputValue) {
      props.handleFindPrev();
    }
    /* if (this.$refs.refFindInput['value']) {
      this.$refs.refRCodeEditor['findBack']();
    } */
  };

  return <>
    {isShowInput && <div className='search-box'>
      <input
        data-testid='searchInput'
        className='search-input'
        autoFocus
        ref = {refFindInput}
        onInput={handleFindInput}
        placeholder={t('placeholder.please_input_search_keyword_base')}
      />
      <span className='serach-prev' onClick={handleFindPrev}>
        <i className='iconfont iconleft-arrow-filling'></i>
      </span>
      <span className='serach-next' onClick={handleFindNext}>
        <i className='iconfont iconright-arrow-filling'></i>
      </span>
      <span className='search-close' onClick={handleCloseInput}>
        <i className='iconfont iconclose'></i>
      </span>
    </div> 
    
    }
    {!isShowInput &&
      <button data-testid='searchButton' className='icon-btn-primary search-button' data-finder-activator onClick={handleShowInput}>
        <i className='iconfont iconfind'></i>
      </button>
    }
    
    
  </>;
}
SearchInput.propTypes = {

};
SearchInput.defaultProps = {
    
};
export default SearchInput;
