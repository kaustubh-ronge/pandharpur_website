import React from "react";

export const metadata = {
  title: "Trip Planner Guide",
  robots: {
    index: false,
    follow: false,
  },
};

const GuideLayout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default GuideLayout;
