import { useState, useEffect } from 'react';
import {
  Slider,
  Box,
  FormLabel,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useSelector } from 'react-redux';
import type { StoreType } from '../../../store';

type MetacriticRatingProps = {
  setMetacriticRating: (platformIds: number[]) => void;
};

const MetacriticRating = ({ setMetacriticRating }: MetacriticRatingProps) => {
  // Default slider value
  const minValue = 0;
  const maxValue = 100;

  // Get rating from the store
  const metacriticRatingInitial = useSelector(
    (state: StoreType) => state.settings.selectedMetacriticRating
  );
  const isMetacriticRatingInitial =
    metacriticRatingInitial && metacriticRatingInitial.length ? true : false;

  // Component states
  const [isChecked, setIsChecked] = useState<boolean>(
    isMetacriticRatingInitial
  );
  const [sliderValue, setSliderValue] = useState<number[]>(
    isMetacriticRatingInitial ? metacriticRatingInitial : [minValue, maxValue]
  );

  // Set selected rating range array
  useEffect(() => {
    setMetacriticRating(isChecked ? sliderValue : []);
  }, [sliderValue, isChecked]);

  function valueText(value: number) {
    return `${value}`;
  }

  // Handle change from else place
  useEffect(() => {
    setIsChecked(isMetacriticRatingInitial);
    setSliderValue(
      isMetacriticRatingInitial ? metacriticRatingInitial : [minValue, maxValue]
    );
  }, [metacriticRatingInitial]);

  // Events
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[]);
  };

  return (
    <Box component='section'>
      <FormLabel id='rating-slider' color='primary'>
        Metacritic Rating
      </FormLabel>

      <Box>
        <FormControlLabel
          control={
            <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
          }
          label='Enable Metacritic Rating Filter'
        />
        {isChecked && (
          <Slider
            aria-labelledby='rating-slider'
            getAriaLabel={() => 'Temperature range'}
            value={sliderValue}
            min={minValue}
            max={maxValue}
            onChange={handleSliderChange}
            valueLabelDisplay='on'
            getAriaValueText={valueText}
            sx={{ mt: 4, width: '90%', mx: 'auto', display: 'block' }}
          />
        )}
      </Box>
    </Box>
  );
};

export default MetacriticRating;
