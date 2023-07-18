import React, { useState } from 'react';
import { Button, Upload, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { VERIFY_PROJECT_API } from '~@/api';

const DownLoadAndUpload = (props: any) => {
  const { t } = useTranslation();
  const {
    imgUrl,
    projectId
  } = props;
  const [fileList, setFileList] = useState([]);

  //上传站场图
  const uploadProps = {
    name: 'file',
    multiple: false,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onChange(info: any) {
      setFileList(info.fileList);
      return false;
    },
    beforeUpload(file: any) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error(t('tips.please_upload_png_jpeg'));
        return false;
      }
    },
    customRequest(item: any) {
      handleUploadStation({ item });
      setFileList([]);
    },
    fileList
  };

  const handleUploadStation = (params: any) => {
    VERIFY_PROJECT_API.stationUpload({ projectId, files: fileList, multiple: false }).then((data: any) => {
      if (data && data.stationUpload && data.stationUpload.id) {
        params.item.onSuccess();
        message.success(t('verify_project.upload_success'));
        props.handleUploadSueecss();
      } else {
        params.item.onError();
        message.error(t('verify_project.upload_fail'));
      }
    });
  };

  return (
    <>
      <a href={imgUrl} download={t('verify_project.station_map')} className='download'>
        <Button className='upload_btn' icon={<i className='iconfont iconimport' />} disabled={imgUrl ? false : true} ></Button>
      </a>
      <span>
        <Upload {...uploadProps}>
          <Button className='upload_btn' icon={<i className='iconfont iconexport' />} ></Button>
        </Upload>
      </span>
    </>
  );
};
export default DownLoadAndUpload;
