import { Card, Typography, FormControl, Stack } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setSelectedPlatformIds,
  setSelectedGenresIds,
  setSelectedDatesRange,
  creareRequestUrl,
  resetScoreResult,
} from '../../store';
import { type Genres as GenresType } from '../../types';
import CenteredContainer from '../../components/Container';
import Platforms from './Platforms';
import Genres from './Genres';
import ReleaseDate from './ReleaseDate';
import ButtonGrid from './ButtonsGrid';

type SelectedPlatformsType = string[];
type SelectedDatesRangeType = string[];

type SelectedParamsType = {
  selectedPlatforms: SelectedPlatformsType;
  selectedGenres: GenresType;
  selectedDatesRangeState: SelectedDatesRangeType;
};

const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Component states
  const [selectedPlatforms, setSelectedPlatforms] =
    useState<SelectedPlatformsType>([]);
  const [selectedGenres, setSelectedGenres] = useState<GenresType>([]);
  const [selectedDatesRangeState, setSelectedDatesRangeState] =
    useState<SelectedDatesRangeType>([]);

  // Events
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSelectedParams({
      selectedPlatforms,
      selectedGenres,
      selectedDatesRangeState,
    });

    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleResetSettings = () => {
    setSelectedParams();
    resetStates();
  };

  const handleResetScore = () => {
    dispatch(resetScoreResult());
  };

  const setSelectedParams = ({
    selectedPlatforms = [],
    selectedGenres = [],
    selectedDatesRangeState = [],
  }: Partial<SelectedParamsType> = {}) => {
    dispatch(setSelectedPlatformIds(selectedPlatforms));
    dispatch(setSelectedGenresIds(selectedGenres));
    dispatch(setSelectedDatesRange(selectedDatesRangeState));
    dispatch(creareRequestUrl());
  };

  const resetStates = () => {
    setSelectedPlatforms([]);
    setSelectedGenres([]);
    setSelectedDatesRangeState([]);
  };

  // Set selected options
  const setPlatforms = (setPlatforms: SelectedPlatformsType) => {
    setSelectedPlatforms(setPlatforms);
  };

  const setGenres = (setGenres: GenresType) => {
    setSelectedGenres(setGenres);
  };

  const setReleaseYear = (setReleaseYear: number[]) => {
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

          <ButtonGrid
            handleCancel={handleCancel}
            handleResetScore={handleResetScore}
            handleResetSettings={handleResetSettings}
          />
        </FormControl>
      </Card>
    </CenteredContainer>
  );
};

export default SettingsPage;
