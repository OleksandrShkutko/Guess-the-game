import { Card, Typography, FormControl, Button, Stack } from '@mui/material';
import CenteredContainer from '../../components/Container';
import Platforms from './Platforms';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedPlatformIds, creareRequestUrl } from '../../store';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(setSelectedPlatformIds(selectedPlatforms));
    dispatch(creareRequestUrl());

    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  const setPlatforms = (setPlatforms: string[]) => {
    setSelectedPlatforms(setPlatforms);
  };

  return (
    <CenteredContainer>
      <Card
        sx={{ padding: 4, width: '100%', maxWidth: 800, textAlign: 'center' }}
      >
        <Typography variant='h5' color='primary'>
          Settings
        </Typography>

        <FormControl
          component={'form'}
          onSubmit={handleSubmit}
          fullWidth
          sx={{ marginTop: 4, textAlign: 'left' }}
        >
          <Platforms setPlatforms={setPlatforms} />

          <Stack mt={4} direction='row' spacing={2} sx={{ width: '100%' }}>
            <Button
              variant='outlined'
              sx={{ width: '50%' }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button variant='contained' type='submit' sx={{ width: '50%' }}>
              Save settings
            </Button>
          </Stack>
        </FormControl>
      </Card>
    </CenteredContainer>
  );
};

export default SettingsPage;
