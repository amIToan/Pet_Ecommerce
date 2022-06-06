type ChildrenProps = {
  children: React.ReactNode;
};

const HigherOrderCo = (props: ChildrenProps) => {
  return <div>{props.children}</div>;
};

export default HigherOrderCo;
