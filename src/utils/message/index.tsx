import React from 'react';
import { Modal } from 'antd';
/**
 *config 对象属性如下：
 * 参数	      说明	                              类型	             默认值
   className	自定义                               CSS class	string	 -
   content	  提示内容	                            ReactNode	         -
   duration	  自动关闭的延时，单位秒。设为0时不自动关闭	number	           3
   icon	      自定义图标	                          ReactNode	         -
   key	      当前提示的唯一标志	                    string | number	   -
   style	    自定义内联样式	                      CSSProperties	     -
   onClick	  点击message时触发的回调函数	          function	         -
   onClose	  关闭时触发的回调函数	                  function	         - *
 */
class Message {
  open(config: any) {
    Modal.open(config);
  }
  common(method: string, config: any) {
    const modal = Modal[method]();
    config.className = 'pop-tips';
    config.closeable = true;
    switch (method) {
      case 'confirm':
        config.icon = <>
          <span className='close' onClick={() => {
            modal.destroy();
          }}>
            <i className='iconfont iconclose'></i>
          </span>  
          <i className='iconfont icontips-filling'></i>
        </>;
        break;
      default:
        config.icon = <>
          <span className='close' onClick={() => {
            modal.destroy();
          }}>
          </span>  
          <i className='iconfont icontips-filling'></i>
        </>;  
    }
    /*config.okButtonProps = {
      className: 'submit-btn'
    };
    config.cancelButtonProps = {
      className: 'cancel-btn'
    };*/
    modal.update(config);
  }
  success(config: any) {
    this.common('success', config);
  }
  confirm(config: any) {
    this.common('confirm', config);
  }
  info(config: any) {
    this.common('info', config);
  }
  warning(config: any) {
    this.common('warning', config);
  }
  warn(config: any) {
    this.common('warn', config);
  }
  loading(config: any) {
    this.common('loading', config);
  }
}
const instance = new Message();
export { Message };
export default instance;
