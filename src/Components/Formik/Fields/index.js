import { useField } from "formik";

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Root {...props}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="form__input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </Root>
  );
};
const Email = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Root {...props}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="form__email" type="email" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </Root>
  );
};
const Date = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Root {...props}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="form__date" type="date" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </Root>
  );
};
const Phone = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Root {...props}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="form__phone" type="tel" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </Root>
  );
};
const Textarea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Root {...props}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea
        className="form__textarea"
        type="textarea"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </Root>
  );
};
const Checkbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <Root {...props}>
      <div>
        <label className="form__checkbox">
          <input type="checkbox" {...field} {...props} />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    </Root>
  );
};
const Root = (props) => {
  return <div className="form__input">{props.children}</div>;
};
const Field = {
  Input,
  Email,
  Date,
  Phone,
  Textarea,
  Checkbox,
};

export default Field;
