import React, { FC } from "react";

export default (): React.ComponentType<any> => {
  const classMap = {
    container: "flex justify-center align-center",
  };

  return () => <div className={classMap.container}>经验</div>;
};
