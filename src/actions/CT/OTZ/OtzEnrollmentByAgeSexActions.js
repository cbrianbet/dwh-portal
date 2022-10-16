import moment from 'moment';
import { CACHING, PAGES } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadOtzEnrollmentByAgeSex = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().otzEnrollmentAgeSex.lastFetch),
        'minutes'
    );
    if (
        getState().ui.ctTab !== 'otz' &&
        getState().ui.currentPage !== PAGES.ct
    ) {
        return;
    } else if (
        diffInMinutes < CACHING.LONG &&
        getState().filters.filtered === false
    ) {
        return;
    } else {
        await dispatch(fetchOtzEnrolled());
    }
};

export const fetchOtzEnrolled = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_OTZ_ENROLLMENT_BY_AGE_SEX_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : '',
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : '',
    };
    const response = await getAll(
        'care-treatment/getOtzEnrollmentAmongAlhivAndOnArtByAgeSex',
        params
    );
    dispatch({
        type: actionTypes.CT_OTZ_ENROLLMENT_BY_AGE_SEX_FETCH,
        payload: { filtered: getState().filters.filtered, list: response },
    });
};
