import '~@/theme/default/components/FloatingBall.scss';
import React from 'react';

const FloatingBall = (props: any) => {
  document.documentElement.style.setProperty('--percent', props.currentPercentage);
  return (
    <section
      id='progress_srt_2020798'
      className='progress_srt_2020798_circle'
      style={{ 'width': props.width, 'height': props.height }}
      onDoubleClick={props.handleClick}
    >
      <div className='progress_srt_2020798_wave' title={props.showPercent}>
        <span
          id='progress_srt_2020798_percent'
          style={{ 'width': props.width, 'height': props.height }}/* , 'lineHeight': props.height  */
        >
          {props.showLabel ? <span>{props.showLabel}</span> : ''}
          <span>{props.showPercent}</span>
        </span>
      </div>
    </section>
  );
};

export default FloatingBall;
