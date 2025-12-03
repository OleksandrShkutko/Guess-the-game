import { Card, Typography, FormControl, Stack } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setSelectedPlatformIds,
  setSelectedGenresIds,
  setSelectedDatesRange,
  setSelectedMetacriticRating,
  creareRequestUrl,
  resetScoreResult,
  openSettingsDialog,
  closeSettingsDialog,
} from '../../store';
import { type Genres as GenresType } from '../../types';
import CenteredContainer from '../../components/Container';
import Platforms from './Platforms';
import Genres from './Genres';
import ReleaseDate from './ReleaseDate';
import ButtonGrid from './ButtonsGrid';
import SettingsDialog from './SettingsDialog';
import MetacriticRating from './MetacriticRating';

type SelectedPlatformsType = string[];
type SelectedDatesRangeType = string[];
type selectedMetacriticRatingType = number[];

type SelectedParamsType = {
  selectedPlatforms: SelectedPlatformsType;
  selectedGenres: GenresType;
  selectedDatesRangeState: SelectedDatesRangeType;
  selectedMetacriticRatingState: selectedMetacriticRatingType;
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
  const [selectedMetacriticRatingState, setSelectedMetacriticRatingState] =
    useState<selectedMetacriticRatingType>([]);
  const [dialogProps, setDialogProps] = useState({});

  // Events
  // Handle form submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dialogProps = {
      title: 'Save Changes',
      text: 'Are you sure you want to save your changes?',
      confirmButton: {
        text: 'Save',
        color: 'success',
        event: () => {
          dispatch(closeSettingsDialog());
          setSelectedParams({
            selectedPlatforms,
            selectedGenres,
            selectedDatesRangeState,
            selectedMetacriticRatingState,
          });

          navigate('/');
        },
      },
    };

    setDialogProps(dialogProps);
    dispatch(openSettingsDialog());
  };

  // Handle buttons events
  const handleCancel = () => {
    const dialogProps = {
      title: 'Cancel Changes',
      text: 'Are you sure you want to cancel your changes? All unsaved changes will be lost.',
      confirmButton: {
        text: 'Ok',
        color: 'warning',
        event: () => {
          dispatch(closeSettingsDialog());
          navigate('/');
        },
      },
    };

    setDialogProps(dialogProps);
    dispatch(openSettingsDialog());
  };

  // Reset settings to default
  const handleResetSettings = () => {
    const dialogProps = {
      title: 'Reset Settings',
      text: 'Are you sure you want to reset your settings to default? This action cannot be undone.',
      confirmButton: {
        text: 'Reset',
        color: 'error',
        event: () => {
          setSelectedParams();
          resetStates();
          dispatch(closeSettingsDialog());
          navigate('/');
        },
      },
    };

    setDialogProps(dialogProps);
    dispatch(openSettingsDialog());
  };

  // Reset score
  const handleResetScore = () => {
    const dialogProps = {
      title: 'Reset Score',
      text: 'Are you sure you want to reset your score? This action cannot be undone.',
      confirmButton: {
        text: 'Reset',
        color: 'error',
        event: () => {
          dispatch(resetScoreResult());
          dispatch(closeSettingsDialog());
        },
      },
    };

    setDialogProps(dialogProps);
    dispatch(openSettingsDialog());
  };

  // Set selected params in the store
  const setSelectedParams = ({
    selectedPlatforms = [],
    selectedGenres = [],
    selectedDatesRangeState = [],
    selectedMetacriticRatingState = [],
  }: Partial<SelectedParamsType> = {}) => {
    dispatch(setSelectedPlatformIds(selectedPlatforms));
    dispatch(setSelectedGenresIds(selectedGenres));
    dispatch(setSelectedDatesRange(selectedDatesRangeState));
    dispatch(setSelectedMetacriticRating(selectedMetacriticRatingState));
    dispatch(creareRequestUrl());
  };

  // Reset component states
  const resetStates = () => {
    setSelectedPlatforms([]);
    setSelectedGenres([]);
    setSelectedDatesRangeState([]);
    setSelectedMetacriticRatingState([]);
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

  const setMetacriticRating = (setMetacriticRating: number[]) => {
    setSelectedMetacriticRatingState(setMetacriticRating);
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
            <MetacriticRating setMetacriticRating={setMetacriticRating} />
          </Stack>

          <ButtonGrid
            handleCancel={handleCancel}
            handleResetScore={handleResetScore}
            handleResetSettings={handleResetSettings}
          />
        </FormControl>
      </Card>

      <SettingsDialog dialogProps={dialogProps} />
    </CenteredContainer>
  );
};

export default SettingsPage;
