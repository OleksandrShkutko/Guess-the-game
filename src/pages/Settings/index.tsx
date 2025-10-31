import { Card, Typography, FormControl, Button, Stack } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setSelectedPlatformIds,
  setSelectedGenresIds,
  creareRequestUrl,
} from '../../store';
import { useNavigate } from 'react-router-dom';
import CenteredContainer from '../../components/Container';
import Platforms from './Platforms';
import Genres from './Genres';
import { type Genres as GenresType } from '../../types';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<GenresType>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(setSelectedPlatformIds(selectedPlatforms));
    dispatch(setSelectedGenresIds(selectedGenres));
    dispatch(creareRequestUrl());

    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  const setPlatforms = (setPlatforms: string[]) => {
    setSelectedPlatforms(setPlatforms);
  };
  const setGenres = (setGenres: GenresType) => {
    setSelectedGenres(setGenres);
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
          <Stack spacing={4}>
            <Platforms setPlatforms={setPlatforms} />
            <Genres setGenres={setGenres} />
          </Stack>

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
