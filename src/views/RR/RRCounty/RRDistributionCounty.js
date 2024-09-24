import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { ETL_DAY } from '../../../constants';

const RRDistributionCounty = () => {
    const filters = useSelector(state => state.filters);
    const rrTab = useSelector(state => state.ui.rrTab);
    const [reportingByCounty, setReportingByCounty] = useState({});

    let tab = null;
    if (rrTab.toUpperCase() === "CT") {
        tab = "Care & Treatment";
    } else if (rrTab.toUpperCase() === "HTS") {
        tab = "HTS";
    } else if (rrTab.toUpperCase() === "PKV") {
        tab = "PKV";
    }

    const loadReportingByCounty = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            fromDate: filters.fromDate || moment()
                                            .subtract(2, 'month')
                                            .add(ETL_DAY, 'days')
                                            .format('MMM YYYY'),
        };
        params.period = filters.fromDate
            ? moment(params.fromDate, 'MMM YYYY')
                  .startOf('month')
                  .subtract(0, 'month')
                  .format('YYYY,M')
            : moment()
                  .subtract(2, 'month')
                  .add(ETL_DAY, 'days')
                  .format('YYYY,M');
        const overallReportingRateResult = await getAll('manifests/recencyreportingbycounty/' + rrTab, params);

        const counties = overallReportingRateResult?.map(({ county  }) => county);
        const emrResultSeries = overallReportingRateResult?.map(({ expected }) => parseInt(expected, 10));

        setReportingByCounty({
            title: { text: '' },
            xAxis: [{ categories: counties?.map(name=> name ? name?.toUpperCase() : name), title: { text: 'COUNTIES' }, crosshair: true }],
            yAxis: [
                { title: { text: 'NUMBER OF EMR SITES' } }
            ],
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80, enabled: false },
            tooltip: { shared: true },
            series: [
                { name: 'Distribution of EMR Sites', type: 'column', data: emrResultSeries, color: "#2F4050" },
            ]
        });



    }, [filters, rrTab]);

    useEffect(() => {
        loadReportingByCounty();
    }, [loadReportingByCounty]);

    return (
        <Card className={"trends-card"}>
            <CardHeader className={"trends-header"}>
                Distribution of EMR sites - { tab } By County
            </CardHeader>
            <CardBody className={"trends-body"}>
                <div className={"col-12"}>
                    <HighchartsReact highcharts={Highcharts} options={reportingByCounty} />
                </div>
            </CardBody>
        </Card>
    );
};

export default RRDistributionCounty;
