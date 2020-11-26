import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const TreatmentOutcomesOverall = ({ globalFilters }) => {
    const [treatmentOutcomesOverall, setTreatmentOutcomesOverall] = useState({});

    const loadTreatmentOutcomesOverall = useCallback(async () => {
        let params = null;
        if (globalFilters) {
            params = { ...globalFilters };
        }
        const treatmentOutcomesCategories = ['Active', 'Dead', 'LTFU', 'Stopped'];
        const result = await getAll('care-treatment/treatmentOutcomesOverall', params);
        let data = [0, 0, 0, 0];
        for(let i = 0; i < result.length; i++) {
            for(let j = 0; j < treatmentOutcomesCategories.length; j++) {
                if (result[i].artOutcome === treatmentOutcomesCategories[j]) {
                    data[j] = data[j] + parseInt(result[i].totalOutcomes);
                }
            }
        }
        setTreatmentOutcomesOverall({
            chart: { type: 'pie' },
            title: { text: '' },
            subtitle: { text: '' },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    },
                    innerSize: '70%',
                }
            },
            series: [{
                name:"Overall Treatment Outcomes",
                colorByPoint: true,
                data: [
                    { name: 'ACTIVE', y: data[0], color: "#485969" },
                    { name: 'DEAD', y: data[1], color: "#60A6E5" },
                    { name: 'LTFU', y: data[2], color: "#1AB394" },
                    { name: 'STOPPED', y: data[3], color: "#BBE65F" },
                ]
            }]
        });
    }, [globalFilters]);

    useEffect(() => {
        loadTreatmentOutcomesOverall();
    }, [loadTreatmentOutcomesOverall]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        OVERALL ART TREATMENT OUTCOMES
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={treatmentOutcomesOverall} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TreatmentOutcomesOverall;