import React from "react";
import "./form.css";

const Form = props => {
  return (
      <div className="container">
          <div>{props.error ? error() : null}</div>
          <form onSubmit={props.loadweather}>
          <div className="row ml-5">
              <div className="col-md-3 offset-md-2">
              <input type="text" name="city" className="form-control" placeholder="City" autoComplete="off" />
              </div>
              <div className="col-md-3">
              <input type="text" name="country" className="form-control" placeholder="Country" autoComplete="off" />
              </div>
              <div className="col-md-3 mt-md-0 mt-2 text-md-left">
              <button className="btn btn-success text-white">Get Weather</button>
              </div>
          </div>
          </form>
      </div>
  )
}

function error(){
    return (
      <div className="alert alert-danger mx-5" role="alert">
        Please Enter City and Country
      </div>
    )
  }

export default Form