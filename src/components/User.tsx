import { useState } from "react";
import { ProfileProps } from "./Profile";
type PrivateProps = {
  isLoggedIn: boolean;
  component: React.ComponentType<ProfileProps>;
};

const Private = ({ isLoggedIn, component: Component }: PrivateProps) => {
  if (isLoggedIn) {
    return <Component name="Toan dep trai" />;
  } else {
    return <div>Con cac day la test</div>;
  }
};

export default Private;
