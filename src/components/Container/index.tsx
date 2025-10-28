import Container from '@mui/material/Container';

type CenteredContainerProps = {
  children: React.ReactNode;
};

const CenteredContainer = ({ children }: CenteredContainerProps) => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        py: 2,
      }}
    >
      {children}
    </Container>
  );
};

export default CenteredContainer;
