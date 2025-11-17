import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Grid,
  Checkbox,
} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  GENRES_SELECTIONS,
  type GenresSelectionVariant,
} from '../../../constants';
import type { StoreType } from '../../../store';
import { API_KEY, API_ROUTE } from '../../../constants';
import { type Genres as GenretType } from '../../../types';

type SetGenresProp = {
  setGenres: (platformIds: string[]) => void;
};

const Genres = ({ setGenres }: SetGenresProp) => {
  // Get genres from the store
  const selectedGenresInitial = useSelector(
    (state: StoreType) => state.settings.selectedGenres
  );

  // Component states
  const [genresSelection, setGenresSelection] =
    useState<GenresSelectionVariant>(
      selectedGenresInitial.length
        ? GENRES_SELECTIONS.select.value
        : GENRES_SELECTIONS.all.value
    );
  const [genresObj, setGenresObj] = useState<JSON | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<GenretType>(
    selectedGenresInitial
  );

  // Ref to track if component has mounted
  const hasMounted = useRef(false);

  useEffect(() => {
    // Get all genres from the API
    if (!hasMounted.current) {
      hasMounted.current = true;
      const fetchData = async () => {
        try {
          const response = await fetch(`${API_ROUTE}/genres?key=${API_KEY}`);
          const result = await response.json();
          setGenresObj(result.results);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, []);

  // Set selected genres array
  useEffect(() => {
    setGenres(
      genresSelection === GENRES_SELECTIONS.select.value
        ? (selectedGenres as string[])
        : []
    );
  }, [genresSelection, selectedGenres]);

  // Handle change from else place
  useEffect(() => {
    setGenresSelection(
      selectedGenresInitial.length
        ? GENRES_SELECTIONS.select.value
        : GENRES_SELECTIONS.all.value
    );
    setSelectedGenres(selectedGenresInitial);
  }, [selectedGenresInitial]);

  // Events
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenresSelection(
      (event.target as HTMLInputElement).value as GenresSelectionVariant
    );
  };

  const handleGenreSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const genre = event.target.name;
    if (event.target.checked) {
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      setSelectedGenres(selectedGenres.filter((item) => item !== genre));
    }
  };

  return (
    <Box component='section'>
      <FormLabel id='genre-radio-buttons' color='primary'>
        Genres
      </FormLabel>

      <RadioGroup
        row
        aria-labelledby='genre-radio-buttons'
        name='row-genre-radio-buttons-group'
        value={genresSelection}
        onChange={handleChange}
        sx={{ mt: 2 }}
      >
        <FormControlLabel
          value={GENRES_SELECTIONS.all.value}
          control={<Radio />}
          label={GENRES_SELECTIONS.all.label}
        />
        <FormControlLabel
          value={GENRES_SELECTIONS.select.value}
          control={<Radio />}
          label={GENRES_SELECTIONS.select.label}
          checked={genresSelection === GENRES_SELECTIONS.select.value}
        />
      </RadioGroup>

      {genresObj !== null &&
        genresSelection === GENRES_SELECTIONS.select.value && (
          <Grid mt={2} spacing={1} container>
            {Object.values(genresObj).map((genre) => {
              return (
                <Grid key={genre.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <FormControlLabel
                    key={genre.id}
                    checked={selectedGenres.includes(genre.id.toString())}
                    control={
                      <Checkbox name={genre.id} onChange={handleGenreSelect} />
                    }
                    label={genre.name}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
    </Box>
  );
};

export default Genres;
