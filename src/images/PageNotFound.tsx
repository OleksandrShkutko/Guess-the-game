import pageNotFound from '/page_not_found.png';

const PageNotFound = ({ className = '', size = 200 }) => {
  return (
    <img
      src={pageNotFound}
      alt='Page not found'
      className={className}
      width={size}
      style={{ maxWidth: '100%' }}
    />
  );
};

export default PageNotFound;
