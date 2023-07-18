import '~@/theme/default/About.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';
import appInfo from '../../../appInfo';
function About() {
  const { t } = useTranslation();
  return <>
    <div className='about'>
      <div className='logo'></div> 
      <p className='name'>{ appInfo.productName }</p>
      <p className='info'>{`${t('app.version')} ${appInfo.version} ${appInfo.deployStatus ? `(${appInfo.deployStatus})` : ''}`}</p>
      <div className='about-bottom'>&copy; {appInfo.copyright} {t('app.copyright')} </div>
    </div>
  </>;
}
export default About;
