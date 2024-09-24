import RRDistributionCounty from './RRCounty/RRDistributionCounty';
import RROverallCounty from './RRCounty/RROverallCounty';
import RRConsistencyCounty from './RRCounty/RRConsistencyCounty';
const _ = require("lodash");

const RRCounty = () => {

    return (
        <div className="row">
            <div className={"col-4"}>
                <RRDistributionCounty />
            </div>
            <div className={"col-4"}>
                <RROverallCounty />
            </div>
            <div className={"col-4"}>
                <RRConsistencyCounty />
            </div>
        </div>
    );
};

export default RRCounty;
