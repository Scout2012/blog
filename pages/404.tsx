import Router from "next/router";
import React, { useEffect, useState } from "react";

export default function Custom404() {
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    // Your condition that can validate the URL
    const pathNameArray = window.location.pathname.split("/");
    if (pathNameArray.length <= 2) {
      Router.replace(window.location.pathname); // Redirect to the right page...
    } else {
      setIsNotFound(true);
    }
  }, []);

  if (isNotFound) return <h1>404 - Page Not Found</h1>;

  return null;
}