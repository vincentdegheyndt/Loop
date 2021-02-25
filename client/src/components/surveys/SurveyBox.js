import React, {useEffect, useState} from 'react'
import {
  XYPlot,
  YAxis,
  HorizontalBarSeries,
  LabelSeries
} from 'react-vis';

const SurveyBox =({survey, noDelete, handleDelete})=>{
    const pending = survey.total-survey.yes-survey.no||"0"
    const [data, setData] = useState([{y: "Pending", x:1, label:"Pending", color:2, xOffset:5},{y: "No", x:0, label:"No", color:0, xOffset:5},{y: "Yes", x:0, label:"Yes", color:1, xOffset:5}])

    useEffect(()=>{
        setTimeout(() => {
            setData([{y: "Pending", x: pending, label:"Pending", color:2, xOffset:5},{y: "No", x: survey.no, label:"No", color:0, xOffset:5},{y: "Yes", x: survey.yes, label:"Yes", color:1, xOffset:5}])
        }, 20);
        // eslint-disable-next-line
    },[])

    
    const colorRange =['#1E88E5', '#A62626', '#26A69A']

    return(
        <div className="card darken-1" key={survey._id}>
            <div className="card-content">
            {/* eslint-disable-next-line */}
            <a disabled={noDelete} className="waves-effect waves-teal btn-flat right" onClick={()=>handleDelete(survey._id)}>
            <i className="material-icons right">delete_forever</i>
            </a>
                <span className="card-title">{survey.title}</span>
                <p>
                    {survey.body}
                </p>
                <p className="right">
                    Sent On: {new Date(survey.dateSent).toLocaleDateString("en-GB")}
                </p>
            </div>

            <div className="card-action " style={{marginLeft:10}}>
                <XYPlot yType="ordinal" width={230} height={175} style={{overflow:"visible"}} colorType="category" colorRange={colorRange}>
                <YAxis/>         
                <HorizontalBarSeries data={data} barWidth={0.5} animation={{ damping: 10, stiffness: 20 }}/>
                <LabelSeries
                    data={data.map((obj) => {
                    return { ...obj, label: obj.x.toString() };
                    })}
                    labelAnchorY="middle"
                    labelAnchorX="text-after-edge"
                    animation
                    />
                </XYPlot>
            </div>
        </div>
    )
}



export default SurveyBox
