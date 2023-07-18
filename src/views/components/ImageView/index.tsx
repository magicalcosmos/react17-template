import '~@/theme/default/components/ImageView.scss';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import Station from '~@vc/Station';
import DownloadAndUploadStation from '~@vc/DownloadAndUploadStation';

function ImageView(props: any) {
  const { t } = useTranslation();
  const projectId = props.projectId;
  const myCanvas: any = useRef(null);
  const imgX: any = 0, // 图片在画布中渲染的起点x坐标
    imgY: any = 0;
  let flag = false;
  const {
    HandleShowNewPage,
    isPop,
    imgUrl
  } = props;
  const [imgScale, setImgScale] = useState<any>(1); //图片的缩放大小；
  const [img, setImg] = useState<any>();

  useEffect(() => {
    loadImg();
    canvasEventsInit();
  }, [imgUrl]);
  useEffect(() => {
    if (img) {
      const curCanvas = myCanvas.current;
      curCanvas.height = img.height * imgScale;
      curCanvas.width = img.width * imgScale;
      const ctx = curCanvas.getContext('2d');
      drawImage(ctx);
    }
  }, [img, imgScale]);
  const loadImg = () => {
    const img = new Image();
    img.src = props.imgUrl;
    img.onload = () => {
      setImg(img);
    };
  };
  const drawImage = (ctx: any) => {
    ctx.clearRect(0, 0, myCanvas.current.width, myCanvas.current.height);
    ctx.drawImage(
      img, //规定要使用的图像、画布或视频。
      0, 0, //开始剪切的 x 坐标位置。
      img.width, img.height, //被剪切图像的高度。
      imgX, imgY, //在画布上放置图像的 x 、y坐标位置。
      img.width * imgScale, img.height * imgScale //要使用的图像的宽度、高度
    );
  };

  const getTranslate = (node: any, sty: any) => { //获取transform值
    const translates = document.defaultView.getComputedStyle(node, null).transform.substring(7);
    const result = translates.match(/\(([^)]*)\)/);// 正则()内容
    const matrix = result ? result[1].split(',') : translates.split(',');
    if (sty === 'x' || sty === undefined) {
      return matrix.length > 6 ? parseFloat(matrix[12]) : parseFloat(matrix[4]);
    } else if (sty === 'y') {
      return matrix.length > 6 ? parseFloat(matrix[13]) : parseFloat(matrix[5]);
    } else if (sty === 'z') {
      return matrix.length > 6 ? parseFloat(matrix[14]) : 0;
    }
  };

  const canvasEventsInit = () => {
    const curCanvas = myCanvas.current;
    curCanvas.onmousedown = (event: any) => {
      const evt = event || window.event;
      const curX = evt.clientX;
      const curY = evt.clientY;
      const targetX: any = getTranslate(curCanvas, 'x');
      const targetY: any = getTranslate(curCanvas, 'y');
      /* const offX = curCanvas.offsetLeft;
      const offY = curCanvas.offsetTop; */
      flag = true;

      //2.给doucument绑定mousemove事件
      document.onmousemove = (event) => {
        if (!flag) { return; }
        const evt = event || window.event;
        const nLeft = evt.clientX - curX + targetX;
        const nTop = evt.clientY - curY + targetY;
        curCanvas.style.transform = `translate(${nLeft + 'px'},${nTop + 'px'})`;
      };

      // 3给document绑定mouseup事件
      document.onmouseup = () => {
        //取消事件
        document.onmousemove = null;
        flag = false;
      };
    };
    curCanvas.onmousewheel = curCanvas.onwheel = (event: any) => { //滚轮放大缩小
      if (event.ctrlKey === true || event.metaKey) {
        event.preventDefault();
      }
      if (window.event && !window.event.ctrlKey) {
        return;
      }
      if (event.wheelDelta > 0) { // 放大
        handleEnlarge();
      } else { //  缩小
        handleShrink();
      }
    };
  };
  /*放大*/
  const handleEnlarge = () => {
    setImgScale((preValue: any) => parseFloat(preValue) + 0.05);
  };
  /*缩小*/
  const handleShrink = () => {
    if (parseFloat(imgScale) - 0.05 <= 0) {
      setImgScale(0);
    } else {
      setImgScale((preValue: any) => parseFloat(preValue) - 0.05);
    }
  };
  /*设置百分比*/
  const handlePercent = (event: any) => {
    let value = event.target.value;
    if (!value) {
      value = 0;
    }
    if (!(/(^[0-9]\d*$)/.test(value))) {
      return;
    }
    const percent = parseFloat(value) / 100;
    setImgScale(percent);
  };
  /*重置大小*/
  const resetPercent = () => {
    setImgScale(1);
    myCanvas.current.style.transform = `translate(0,0)`;
  };

  const handleNewPage = () => {
    HandleShowNewPage(isPop);
  };

  return (
    <div className='image_view'>
      <div className='tool_bar'>
        <DownloadAndUploadStation projectId={projectId} imgUrl={imgUrl} handleUploadSueecss={props.handleUploadSuccess} />
        <span className='shrink_enlarge'>
          <i className='iconfont iconshrink' onClick={handleShrink} />
          <Input className='percent' onChange={handlePercent} defaultValue={imgScale} value={(Math.abs(imgScale * 100)).toFixed(0)} />%
          <i className='iconfont iconenlarge' onClick={handleEnlarge} />
        </span>
        <span className='reset'><i className='iconfont iconreset' onClick={resetPercent} /></span>
        {isPop ? (<span className='new_page_show' onClick={handleNewPage}>{t('verify_project.close_new_page_show')}</span>)
          : (<span className='new_page_show' onClick={handleNewPage}>{t('verify_project.new_page_show')}</span>)
        }
        <Button />
      </div>
      <div className='image_content'>
        <Station projectId={projectId} />
      </div>
    </div>
  );
}

export default ImageView;
