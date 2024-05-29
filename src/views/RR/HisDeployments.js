import HisDeploymentsOverview from './HisDeploymentsOverview';
import HisDeploymentsEMRStatusByPartner from './HisDeploymentsEMRStatusByPartner';
import HisDeploymentsFacilityLevelByOwnershipPartner from './HisDeploymentsFacilityLevelByOwnershipPartner';
import HisDeploymentsFacilityLevelByOwnershipCounty from './HisDeploymentsFacilityLevelByOwnershipCounty';
import HisDeploymentsFacilityByInfrastructure from './HisDeploymentsFacilityByInfrastructure';
import HisDeploymentsLinelist from './HisDeploymentsLinelist';
import SectionHeader from '../Shared/SectionHeader';
import React, { useEffect } from 'react';
import moment from 'moment';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../Shared/UniversalFilter';
import { disableStickyFilter, enableStickyFilter } from '../../actions/Shared/uiActions';
import { useDispatch } from 'react-redux';
import { loadHisFacilityLinelistAction } from '../../actions/RR/hisFacilityLinelistActions';
import { loadHisFacilityByInfrastructureActions } from '../../actions/RR/hisFacilityByInfrastructureActions';
import { loadHisFacilityStatusByPartnerAction } from '../../actions/RR/hisFacilityStatusByPartnerActions';
import { loadHisFacilityLevelByCountyAction } from '../../actions/RR/hisFacilityLevelByCountyActions';
import { loadHisFacilityLevelByPartnerAction } from '../../actions/RR/hisFacilityLevelByPartnerActions';
import { loadHisFacilityStatusAction } from '../../actions/RR/hisFacilityStatusActions';

const HisDeployments = () =>{
    return (
        <>
            <HisDeploymentsOverview />
            <HisDeploymentsEMRStatusByPartner />
            <HisDeploymentsFacilityLevelByOwnershipPartner />
            <HisDeploymentsFacilityLevelByOwnershipCounty />
            <HisDeploymentsFacilityByInfrastructure />
            <HisDeploymentsLinelist />
        </>
    )
}


export default HisDeployments
