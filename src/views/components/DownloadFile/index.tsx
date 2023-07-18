import '~@/theme/default/components/DownloadFile.scss';
import React, { useState } from 'react';
import classNames from 'classnames';
import { Modal, Button } from 'antd';
import { COMMON_API } from '~@/api';
import Common from '~@/utils/common';
import localStorage from '~@/utils/localStorage';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { ERRORCODE } from '~@/utils/errors';
const { STATIC_ENDPOINT } = Common.getEnv();

const DownloadFile = (props: any) => {
  const { t } = useTranslation();
  const { downloadFiles, modalTitle, title, keyId } = props;
  const [selectedFiles, setSelectedFiles] = useState(downloadFiles);
  const [loading, setLoading] = useState(false);
  const downloadFileTypeArray: any = {
    3: t('requirement_baseline.lspec_language_name'),
    4: t('requirement_baseline.nature_language_name')
  };

  const handleDownloadFile = (value: any) => {
    selectedFiles.map((item: any) => {
      if (item.value === value) {
        item.status = !item.status;
      }
    });
    setSelectedFiles([...selectedFiles]);
  };

  const handleDownloadCancel = () => {
    props.handleDownloadCancel();
  };

  const handleDownloadOk = () => {
    //调获取文件的接口
    const selectFileIdArray: any = [];
    selectedFiles.map((item: any) => {
      if (item.status) {
        selectFileIdArray.push(item.value);
      }
    });
    if (selectFileIdArray.length === 0) {
      message.info(t('tips.please_select_fileType'));
      return;
    }
    setLoading(true);
    const downloadFile = { fileType: JSON.stringify(selectFileIdArray), keyId };
    COMMON_API.buildDownloadFile(downloadFile).then((data: any) => {
      setLoading(false);
      if (data && data.buildDownloadFile) {
        const buildDownloadFile = data.buildDownloadFile;
        buildDownloadFile.forEach((item: any) => {
          item.fileUrl = `${STATIC_ENDPOINT}/api/v1/download/${item.fileName}?accessToken=${localStorage.getToken()}&time=${new Date().getTime()}`;
          item.fileTypeName = downloadFileTypeArray[item.fileType];
        });
        download1(buildDownloadFile);
        props.handleDownloadOk && props.handleDownloadOk();
      }
    }).catch((error: any) => {
      setLoading(false);
      const { extensions } = error;
      if (extensions) {
        switch (extensions.code) {
          case ERRORCODE.ExCode_DownloadNotFound_Err:
            message.info(t('error.not_found_content'));
            break;
        }
      }
    });
  };

  const download1 = (downloadList: any) => {
    /* downloadList.map((item) => {
      const iframe = document.createElement('iframe');
      iframe.name = '基线文件';
      iframe.src = item.fileUrl;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      iframe.contentDocument.execCommand('SaveAs', false, '基线文件');
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 3000);
    }); */
    downloadList.forEach((item: any, index: number) => {
      setTimeout(() => {
        let downloadName = item.fileName;
        if (props.demandName && props.version) {
          downloadName = `${props.demandName}_${props.version}_${item.fileTypeName}.zip`;
        }
        courseDownload(item.fileUrl, downloadName);
      }, 1000 * index);
    });
  };

  const courseDownload = (url: string, filename: string) => {
    getBlob(url, (blob: any) => {
      saveAs(blob, filename);
    });
  };
  const getBlob = (url: string, cb: any) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      if (xhr.status === 200) {
        cb(xhr.response);
      }
    };
    xhr.send();
  };

  /**
  * 保存
  * @param  {Blob} blob
  * @param  {String} filename 想要保存的文件名称
  */
  const saveAs = (blob: any, filename: string) => {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      const body: any = document.querySelector('body');

      link.href = window.URL.createObjectURL(blob);
      link.download = filename;

      // fix Firefox
      link.style.display = 'none';
      body.appendChild(link);

      link.click();
      body.removeChild(link);

      window.URL.revokeObjectURL(link.href);
    }
  };

  return (
    <>
      <Modal title={modalTitle} wrapClassName='download-modal' visible={true} width='460px' onOk={handleDownloadOk} onCancel={handleDownloadCancel}
        footer={[
          <Button key='back' onClick={handleDownloadCancel} className='cancel-btn'>
            {t('button.cancel')}
          </Button>,
          <Button key='submit' type='primary' loading={loading} className='submit-btn' onClick={handleDownloadOk}>
            {t('button.sure')}
          </Button>
        ]}
      >
        <div className='title'>{title}</div>
        <div className='download-btn-section'>
          {selectedFiles && selectedFiles.map((item: any) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div data-testid={'download-' + item.value} className={classNames('download-btn', item.status && 'active')} onClick={() => { handleDownloadFile(item.value); }}>
                <svg className='icon' aria-hidden='true'><use xlinkHref={`#${item.icon}`}></use></svg>
                {item.status && <i className='iconfont iconcheck-mark' />}
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default DownloadFile;
