import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

export default class DynamicForm extends React.Component {
  state = {};
  constructor(props) {
    super(props);
  }

  onSubmit(e) {
    e.preventDefault();
    alert("Form submitted successfully");
  }
  renderForm = () => {
    let model = this.props.model;
    console.log("props", model);
    if (this.props.model) {
      let formUI = model.map(m => {
        let key = m.key;
        let type = m.type || "text";
        let props = m.props || {};
        let name = m.name || "";
        let value = m.value || "";

        let target = key;
        value = this.state[target];
        let input = (
          <input
            {...props}
            className="form-input"
            type={type}
            key={key}
            name={name}
            value={value}
          />
        );
        if (type == "radio") {
          input = m.options.map(o => {
            let checked = o.value;
            return (
              <React.Fragment key={"fr" + o.key}>
                <input
                  {...props}
                  className="form-input"
                  type={type}
                  key={o.key}
                  name={o.name}
                  checked={checked}
                  value={o.value}
                />
                <label key={"ll" + o.key}>{o.label}</label>
              </React.Fragment>
            );
          });
          input = <div className="form-group-radio">{input}</div>;
        }
        
        if (type == "select") {
          input = m.options.map(o => {
            return (
              <option
                {...props}
                className="form-input"
                key={o.key}
                value={o.value}
              >
                {o.label}
              </option>
            );
          });

          console.log("Select default: ", value);
          input = <select value={value}>{input}</select>;
        }
        
        return (
          <div key={"g" + key} className="form-group">
            <label className="form-label" key={"l" + key} htmlFor={key}>
              {m.label}
            </label>
            {input}
          </div>
        );
      });
      return formUI;
    }
  };

  render() {
    let title = this.props.title || "Registration Form";

    return (
      <div className={this.props.className + " form-aligning"}>
        <h3 className="form-title">{title}</h3>
        <form
          className="dynamic-form"
          onSubmit={e => {
            this.onSubmit(e);
          }}
        >
          {this.renderForm()}
          <div className="form-actions">
            <button type="submit">submit</button>
          </div>
        </form>
      </div>
    );
  }
}
