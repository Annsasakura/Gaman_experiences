export const InputElement = ({
  id,
  name,
  value,
  setValue,
  type,
  children,
  className,
  required,
}) => {
  return (
    <fieldset>
      <label htmlFor={id} className={className}>
        {children}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        placeholder={name}
        required={required}
      />
    </fieldset>
  );
};
