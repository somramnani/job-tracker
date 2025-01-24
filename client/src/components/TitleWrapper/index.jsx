import { Helmet } from "react-helmet";

const TitleWrapper = ({ title, children }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
};

export default TitleWrapper;
