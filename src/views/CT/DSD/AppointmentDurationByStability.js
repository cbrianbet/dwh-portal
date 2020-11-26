import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const AppointmentDurationByStability = ({ globalFilters }) => {
    const [appointmentDurationByStability, setAppointmentDurationByStability] = useState({});

    const loadAppointmentDurationByStability = useCallback(async () => {
        let params = null;
        if (globalFilters) {
            params = { ...globalFilters };
        }
        const appointmentCategories = ['< 1 Month', '1-2 Months', '3-4 Months', '> 4 Months'];
        const stabilityCategories = ['Stable', 'Unstable'];
        const result = await getAll('care-treatment/getDsdAppointmentCategorizationByStabilityStatus', params);
        let data = [];
        // seed all values sp that missing values default to 0
        for(let i = 0; i < appointmentCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < stabilityCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < result.length; i++) {
            let appointmentIndex = appointmentCategories.indexOf(result[i].AppointmentsCategory);
            let stabilityIndex = stabilityCategories.indexOf(result[i].Stability);
            if(appointmentIndex === -1 || stabilityIndex === -1 ) { // unsupported
                continue;
            }
            data[appointmentIndex][stabilityIndex] = data[appointmentIndex][stabilityIndex] + parseInt(result[i].patients);
        }
        setAppointmentDurationByStability({
            chart: { type: 'column' },
            title: { useHTML: true, text: '&nbsp;' },
            subtitle: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{
                categories: stabilityCategories,
                crosshair: true
            }],
            yAxis: [{
                min: 0,
                title: { text: 'Percentage of Patients' },
            }],
            tooltip: { shared: true },
            legend: {
                floating: true,
                layout: 'horizontal',
                align: 'left',
                verticalAlign: 'top',
                y: 0,
                x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: '< 1 MONTH', data: data[0], type: 'column', color: "#485969", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: '1-2 MONTHS', data: data[1], type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: '3-4 MONTHS', data: data[2], type: 'column', color: "#60A6E5", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: '> 4 MONTHS', data: data[3], type: 'column', color: "#BBE65F", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [globalFilters]);

    useEffect(() => {
        loadAppointmentDurationByStability();
    }, [loadAppointmentDurationByStability]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        APPOINTMENT DURATION PRACTICES BY STABILITY STATUS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={appointmentDurationByStability} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default AppointmentDurationByStability;