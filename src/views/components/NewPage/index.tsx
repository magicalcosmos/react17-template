import '~@/theme/default/components/NewPage.scss';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Station from '~@vc/Station';
import TrapezoidDiagram from '~@vc/TrapezoidDiagram';


function NewPage(props: any) {
  const { t } = useTranslation();
  const {
    projectId,
    expressId,
    expressStatus,
    subRequirementId,
    oldStatusSelectValue,
    statusSelectValue,
    selectDeviceName
  } = props;
  const [cycleNumber, setCycleNumber] = useState(0);
  const goBack = () => {
    props.closeNewPage && props.closeNewPage();
  };

  const handleSetCycleNumber = (cycleNumber: number) => {
    setCycleNumber(cycleNumber);
    props.handleSetCycleNumber && props.handleSetCycleNumber(cycleNumber);
  };
  return <div className='new_page'>
    <div className='title'>
      <i className='iconfont iconback' onClick={goBack} />
      <span onClick={goBack}>{t('verify_project.back_project')}</span></div>
    <div className='new_page_content'>
      <div className='trapezoid_diagram_content'>
        <div className='title'>{t('verify_project.trapezoid_diagram')}</div>
        <TrapezoidDiagram projectId={projectId} expressId={expressId} expressStatus={expressStatus} subRequirementId={subRequirementId} oldStatusSelectValue={oldStatusSelectValue} statusSelectValue={statusSelectValue} setCycleNumber={handleSetCycleNumber} cycleNumber={props.cycleNumber} />
      </div>
      <div className='station_content'>
        <div className='title'>{t('verify_project.station_map')}</div>
        <Station projectId={projectId} cycleNumber={cycleNumber} showDownload={false} showNewPage={false} subRequirementId={subRequirementId} selectDeviceName={selectDeviceName} expressId={expressId} />
      </div>
    </div>
  </div>;
}

export default NewPage;
