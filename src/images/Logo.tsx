import logo from '/logo.png';

const Logo = ({ className = '', size = 200 }) => {
  return (
    <img
      src={logo}
      alt='Logo'
      className={className}
      width={size}
      style={{ maxWidth: '100%' }}
    />
  );
};

export default Logo;
