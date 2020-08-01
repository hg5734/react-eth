import React from "react";
const styles = {
  input : {
    marginTop :'10px',
    height: '30px',
    width: '400px',
    borderWidth:1,
    borderColor:'blue',
    backgroundColor: '#80fffff',
  },
  error :{
    margin: '3px',
    color: 'red'
  }

}
export const renderField = ({ input, label, type, meta: { touched, error, warning } }: any) => (
    <div>
      <div>
        <input {...input} style={styles.input} placeholder={label} type={type}/>
        {touched && ((error && <div style={styles.error} >{error}</div>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )