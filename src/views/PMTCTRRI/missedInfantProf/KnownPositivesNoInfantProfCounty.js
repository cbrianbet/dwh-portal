import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as prepSelector from '../../../selectors/HTS/Prep/PrepTrendsSelector';
import moment from 'moment';

const KnownPositivesNoInfantProfCounty = () => {
    let eliVnew = useSelector(prepSelector.getPrepEligibleVnewTrend);
    const [
        prepEligibleVsNewInitiatedTrends,
        setPrepEligibleVsNewInitiatedTrends,
    ] = useState({});

    const loadPrepEligibleVsNewInitiatedTrends = useCallback(async () => {
        setPrepEligibleVsNewInitiatedTrends({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: ['NA', 'BO', 'VV'],
                crosshair: true,
                title: {
                    text: 'COUNTY',
                },
            },
            yAxis: [
                {
                    min: 0,
                    title: {
                        text: 'NUMBER OF PATIENTS',
                    },
                },
            ],
            tooltip: {
                headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true,
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
            },
            plotOptions: {
                column: {
                    pointPadding: 0.01,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    type: 'column',
                    name: 'PREGNANT MOTHERS',
                    data: [532, 432, 407, 70],
                    color: '#142459',
                },
            ],
        });
    }, [eliVnew]);

    useEffect(() => {
        loadPrepEligibleVsNewInitiatedTrends();
    }, [loadPrepEligibleVsNewInitiatedTrends]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                {`NUMBER NOT GIVEN INFANT PROPHYLAXIS AT FIRST ANC AMONG KNOWN POSITIVE MOTHERS BY COUNTY`}
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={prepEligibleVsNewInitiatedTrends}
                />
            </CardBody>
        </Card>
    );
};

export default KnownPositivesNoInfantProfCounty;
