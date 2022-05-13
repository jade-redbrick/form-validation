import React, { forwardRef } from "react";
import "./index.scss";

// function Input(props) {
//   return (
//     <Base {...props} type="input">
//       <input
//         className="field__input"
//         name={props.name}
//         value={props.value}
//         placeholder={props.placeholder}
//         {...props}
//       />
//     </Base>
//   );
// }

const Input = forwardRef((props, ref) => {
  return (
    <Base {...props} type="input">
      <input
        className="field__input"
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        {...props}
      />
    </Base>
  );
});
function TextArea(props) {
  return (
    <Base {...props} type="textarea">
      <textarea
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        onChange={(e) => {
          props.onChange(props.name, e.currentTarget.value);
        }}
      />
    </Base>
  );
}

function Phone(props) {
  return (
    <Base {...props} type="phone">
      <input
        type="text"
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        pattern="[0-9]{0,5}"
        onChange={(e) => {
          const regex = /^[0-9\b]+$/;
          if (regex.test(e.target.value)) {
            props.onChange(props.name, e.currentTarget.value);
          }
        }}
      />
    </Base>
  );
}

function Base(props) {
  return (
    <Root {...props}>
      <div className="challenge-apply__field__header">
        <div className="challenge-apply__field__title">
          {props.title || "-"}
        </div>
      </div>
      <div className="challenge-apply__field__body">{props.children}</div>
    </Root>
  );
}

function Root(props) {
  return (
    <div
      className={
        "challenge-apply__field" +
        ` challenge-apply__field--${props.type}` +
        (props.classModifier
          ? ` challenge-apply__field--${props.classModifier}`
          : "")
      }
    >
      {props.children}
    </div>
  );
}

const Field = {
  Input,
  TextArea,
  Phone,
};

export default Field;
