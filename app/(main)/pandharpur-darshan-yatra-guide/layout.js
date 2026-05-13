import React from "react";

export const metadata = {
  title: "Trip Planner Guide",
  robots: "noindex, nofollow",
};

const GuideLayout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default GuideLayout;
