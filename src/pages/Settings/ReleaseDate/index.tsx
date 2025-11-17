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

type ReleaseYearProps = {
  setReleaseYear: (platformIds: number[]) => void;
};

const ReleaseDate = ({ setReleaseYear }: ReleaseYearProps) => {
  // Default slider value
  const minValue = 1970;
  const maxValue = new Date().getFullYear();

  // Get dates range from the store
  const datesRangeInitial = useSelector(
    (state: StoreType) => state.settings.selectedDatesRange
  );
  const yearsRangeInitial: number[] = datesRangeInitial.map((date) => {
    const year = date.split('-')[0];
    return Number(year);
  });

  // Component states
  const [isChecked, setIsChecked] = useState<boolean>(
    datesRangeInitial && datesRangeInitial.length ? true : false
  );
  const [sliderValue, setSliderValue] = useState<number[]>(
    datesRangeInitial && datesRangeInitial.length
      ? yearsRangeInitial
      : [minValue, maxValue]
  );

  // Set selected years range array
  useEffect(() => {
    setReleaseYear(isChecked ? sliderValue : []);
  }, [sliderValue, isChecked]);

  function valueText(value: number) {
    return `${value}`;
  }

  // Handle change from else place
  useEffect(() => {
    setIsChecked(datesRangeInitial && datesRangeInitial.length ? true : false);
    setSliderValue(
      datesRangeInitial && datesRangeInitial.length
        ? yearsRangeInitial
        : [minValue, maxValue]
    );
  }, [datesRangeInitial]);

  // Events
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[]);
  };

  return (
    <Box component='section'>
      <FormLabel id='date-slider' color='primary'>
        Release Year Range
      </FormLabel>

      <Box>
        <FormControlLabel
          control={
            <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
          }
          label='Select Release Year Range'
        />
        {isChecked && (
          <Slider
            aria-labelledby='date-slider'
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

export default ReleaseDate;
