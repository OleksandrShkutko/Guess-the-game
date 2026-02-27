import * as Image from '../../images';
import CenteredContainer from '../../components/Container';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const PageNotFound = () => {
  return (
    <CenteredContainer>
      <Image.PageNotFound size={400} />
      <Link to='/'>
        <Button variant='outlined' sx={{ mt: 2 }}>
          Home
        </Button>
      </Link>
    </CenteredContainer>
  );
};

export default PageNotFound;
