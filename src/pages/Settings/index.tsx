import { Card, Typography, FormControl, Button, Stack } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setSelectedPlatformIds,
  setSelectedGenresIds,
  setSelectedDatesRange,
  creareRequestUrl,
} from '../../store';
import { useNavigate } from 'react-router-dom';
import CenteredContainer from '../../components/Container';
import Platforms from './Platforms';
import Genres from './Genres';
import { type Genres as GenresType } from '../../types';
import ReleaseDate from './ReleaseDate';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Component states
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<GenresType>([]);
  const [selectedDatesRangeState, setSelectedDatesRangeState] = useState<
    string[]
  >([]);

  // Events
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(setSelectedPlatformIds(selectedPlatforms));
    dispatch(setSelectedGenresIds(selectedGenres));
    dispatch(setSelectedDatesRange(selectedDatesRangeState));
    dispatch(creareRequestUrl());

    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  // Set selected options
  const setPlatforms = (setPlatforms: string[]) => {
    setSelectedPlatforms(setPlatforms);
  };

  const setGenres = (setGenres: GenresType) => {
    setSelectedGenres(setGenres);
  };

  const setReleaseYear = (setReleaseYear: number[]) => {
    console.log(setReleaseYear);

    const formatedDate = setReleaseYear.map((year, index, array) => {
      if (index === array.length - 1) {
        const currentDay = new Date();
        const formaterCurrentDay = currentDay.toISOString().substring(0, 10);
        const currentYear = new Date().getFullYear();

        if (currentYear === year) {
          return formaterCurrentDay;
        } else {
          const lastDay = new Date(year, 11, 31);
          const formatedLastDay = lastDay.toISOString().substring(0, 10);
          return formatedLastDay;
        }
      } else {
        const firstDay = new Date(year, 1, 1);
        const formatedFirstDay = firstDay.toISOString().substring(0, 10);
        return formatedFirstDay;
      }
    });

    setSelectedDatesRangeState(formatedDate);
  };

  return (
    <CenteredContainer>
      <Card
        sx={{
          marginX: 4,
          padding: 4,
          width: 800,
          maxWidth: 'calc(100% - 64px)',
          maxHeight: 'calc(100vh - 112px)',
          overflowY: 'auto',
          textAlign: 'center',
        }}
      >
        <Typography variant='h5' color='primary'>
          Settings
        </Typography>

        <FormControl
          component={'form'}
          onSubmit={handleSubmit}
          fullWidth
          sx={{ mt: 4, textAlign: 'left', position: 'relative' }}
        >
          <Stack spacing={4}>
            <Platforms setPlatforms={setPlatforms} />
            <Genres setGenres={setGenres} />
            <ReleaseDate setReleaseYear={setReleaseYear} />
          </Stack>

          <Stack
            position={'sticky'}
            bottom={0}
            mt={4}
            direction='row'
            spacing={2}
            sx={{
              width: '100%',
            }}
          >
            <Button
              variant='outlined'
              sx={{
                width: '50%',
                backgroundColor: 'background.paper',
                backgroundImage: 'var(--Paper-overlay)',
              }}
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
