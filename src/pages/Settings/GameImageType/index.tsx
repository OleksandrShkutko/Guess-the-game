import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { StoreType } from '../../../store';

import {
  Box,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import {
  IMAGE_TYPE_SELECTION,
  type ImageTypeSelectionVariant,
} from '../../../constants';

type ImageTypeProps = {
  setImageType: (imageType: string) => void;
};

const GameImageType = ({ setImageType }: ImageTypeProps) => {
  // Get selected image type from the store
  const selectedImageTypeInitial =
    (useSelector(
      (state: StoreType) => state.settings.selectedImageType
    ) as ImageTypeSelectionVariant) || IMAGE_TYPE_SELECTION.background.value;

  // Component states
  const [selectedImageType, setSelectedImageType] =
    useState<ImageTypeSelectionVariant>(selectedImageTypeInitial);

  // Set selected image type
  useEffect(() => {
    setImageType(selectedImageType);
  }, [selectedImageType]);

  // Handle change from else place
  useEffect(() => {
    setSelectedImageType(selectedImageTypeInitial);
  }, [selectedImageTypeInitial]);

  // Events
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImageType(
      (event.target as HTMLInputElement).value as ImageTypeSelectionVariant
    );
  };

  return (
    <Box component='section'>
      <FormLabel id='image-type-radio-buttons' color='primary'>
        Game Image Type
      </FormLabel>

      <RadioGroup
        row
        aria-labelledby='image-type-radio-buttons'
        name='row-image-type-radio-buttons-group'
        value={selectedImageType}
        onChange={handleChange}
        sx={{ mt: 2 }}
      >
        <FormControlLabel
          value={IMAGE_TYPE_SELECTION.background.value}
          control={<Radio />}
          label={IMAGE_TYPE_SELECTION.background.label}
        />
        <FormControlLabel
          value={IMAGE_TYPE_SELECTION.screenshot.value}
          control={<Radio />}
          label={IMAGE_TYPE_SELECTION.screenshot.label}
          checked={selectedImageType === IMAGE_TYPE_SELECTION.screenshot.value}
        />
      </RadioGroup>
    </Box>
  );
};

export default GameImageType;
