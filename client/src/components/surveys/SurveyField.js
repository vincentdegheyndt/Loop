const SurveyField = ({input, label, meta:{error, touched}})=>{
    // {...input} is the same as onBlur={input.onBlur},.....
    return (
        <div>
            <label>{label}</label>
            <input {...input}style={{marginBottom:5}}/>
            {/* touched && error && (error) */}
            <div className="red-text" style={{marginBottom:20}}>
            {touched && error}
            </div>
        </div>
    )
}

export default SurveyField