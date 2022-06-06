type StyleProps = {
  style: React.CSSProperties;
};
const Button = ({ style }: StyleProps) => {
  return <div style={style}>Button</div>;
};

export default Button;
