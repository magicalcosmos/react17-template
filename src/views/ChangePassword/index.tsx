import '~@/theme/default/ChangePassword.scss';
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Form, message } from 'antd';
import { useStore } from '~@/hooks';
import { USER_MANAGEMENT_API } from '~@/api';
import { ERRORCODE } from '~@/utils/errors';
import Log from '~@/utils/log';
import Authentication from '~@/utils/authorization';
import MD5 from 'js-md5';
import { observer } from 'mobx-react';
function ChangePassword() {
  /*************** Variables *****************/ 
  const store: any = useStore('userStore');
  const { t } = useTranslation();
  const formRef: any = useRef();
  const [errorMesage, setErrorMessage] = useState('');
  /*************** Functions *****************/ 
  function handlePasswordChange() {
    const fields = formRef.current.getFieldsValue(true);
    if (fields.newPassword === fields.confirmPassword) {
      setErrorMessage('');
    }
  }
  function handleFinish() {
    const fields = formRef.current.getFieldsValue(true);
    if (fields.newPassword !== fields.confirmPassword) {
      setErrorMessage(t('error.confirm_password_not_match'));
      return;
    } else {
      setErrorMessage('');
    }
    const params = {
      password: MD5(fields.password),
      newPassword: MD5(fields.newPassword)
    };
    USER_MANAGEMENT_API.changePassword(params).then(() => {
      message.info(t('tips.edit_success')).then(() => {
        Authentication.signout();
      });
    }).catch((err) => {
      const { extensions } = err;
      if (extensions) {
        switch (extensions.code) {
          case ERRORCODE.UserPwdModifyFailed:
            setErrorMessage(t('error.user_password_error'));
            break;
          case ERRORCODE.NoPermission:
          case ERRORCODE.UserHasNoFound:
            Log.error('function handleFinish occur error: ', err);
            message.error(t(`tips.edit_failed`));
            break;
        }  
      }
    });
  }
  function handleCancel() {
    window.history.go(-1);
  }
  return (
    <div className='change-password'>
      <div className='change-password-header'>{t('user.change_password')}</div>
      <div className='change-password-content'>
        <div className='change-password-content-wrap'>
          <Form
            ref={formRef}
            name='basic'
            requiredMark={false}
            onFinish={handleFinish}
          >
            <Form.Item 
              label={t('user.name')}
              className='user-name'
            >
              {store.user?.username}
            </Form.Item>
            <Form.Item 
              label={t('user.old_password')}
              name='password'
              rules={[{ required: true, message: t('placeholder.please_type_old_password') }]}
            >
              <Input.Password data-testid='password' placeholder={t('placeholder.please_type_old_password')}/>
            </Form.Item>
            <Form.Item 
              label={t('user.new_password')}
              name='newPassword'
              rules={[{ required: true, validator: async(_, names) => {
                if (!names) {
                  return Promise.reject(new Error(t('placeholder.please_type_new_password')));
                }
                if (names.length < 6) {
                  return Promise.reject(new Error(t('rules.password_length')));
                }
              } }]}
            >
              <Input.Password data-testid='newPassword' placeholder={t('placeholder.please_type_new_password')} onChange={handlePasswordChange}/>
            </Form.Item>
            <Form.Item 
              label={t('user.confirm_password')}
              name='confirmPassword'
              rules={[{ required: true, validator: async(_, names) => {
                if (!names) {
                  return Promise.reject(new Error(t('placeholder.please_type_confirm_password')));
                }
                if (names !== formRef.current.getFieldValue('newPassword')) {
                  return Promise.reject(new Error(t('error.confirm_password_not_match')));
                }
              } }]}
            >
              <Input.Password data-testid='confirmPassword' placeholder={t('placeholder.please_type_confirm_password')} onChange={handlePasswordChange}/>
            </Form.Item>
            <Form.Item>
              <div className='error-message'>{errorMesage}</div>
            </Form.Item>
            <Form.Item className='button-list'>
              <Button htmlType='button' onClick={handleCancel}>{t('button.cancel')}</Button>
              <Button htmlType='submit' type='primary'>{t('button.sure')}</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default observer(ChangePassword);
