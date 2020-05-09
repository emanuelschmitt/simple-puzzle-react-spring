import React from "react";

function Gate({ children }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted ? children : null;
}

export default Gate;
