import styles from "./Button.module.css";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function Button({
  as = "button",
  variant = "primary",
  size,
  block,
  className,
  children,
  ...rest
}) {
  const Tag = as;
  return (
    <Tag
      className={cx(
        styles.btn,
        styles[variant],
        size && styles[size],
        block && styles.block,
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
