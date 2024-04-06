import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="336" y="191" rx="3" ry="3" width="88" height="6" />
    <circle cx="66" cy="31" r="2" />
    <circle cx="125" cy="125" r="125" />
    <circle cx="166" cy="187" r="12" />
    <rect x="0" y="271" rx="0" ry="0" width="245" height="18" />
    <rect x="115" y="370" rx="0" ry="0" width="4" height="0" />
    <rect x="0" y="308" rx="0" ry="0" width="247" height="77" />
    <rect x="2" y="401" rx="0" ry="0" width="94" height="41" />
    <rect x="133" y="394" rx="0" ry="0" width="112" height="60" />
  </ContentLoader>
);

export default Skeleton;
