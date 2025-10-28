import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { PLATFORMS } from '../../../constants';
import { useSelector } from 'react-redux';
import type { StoreType } from '../../../store';

type PlatformsProps = {
  setPlatforms: (platformIds: string[]) => void;
};

const Platforms = ({ setPlatforms }: PlatformsProps) => {
  const selectedPlatformsInitial = useSelector(
    (state: StoreType) => state.settings.selectedPlatforms
  );

  const [platformsSelection, setPlatformsSelection] = useState(
    selectedPlatformsInitial.length ? 'select' : 'all'
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    selectedPlatformsInitial
  );

  useEffect(() => {
    setPlatforms(platformsSelection === 'select' ? selectedPlatforms : []);
  }, [platformsSelection, selectedPlatforms]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlatformsSelection((event.target as HTMLInputElement).value);
  };

  const handlePlatformSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const platform = event.target.name;
    if (event.target.checked) {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    } else {
      setSelectedPlatforms(
        selectedPlatforms.filter((item) => item !== platform)
      );
    }
  };

  return (
    <>
      <FormLabel id='platforms-radio-buttons' color='primary'>
        Platforms
      </FormLabel>

      <RadioGroup
        row
        aria-labelledby='platforms-radio-buttons'
        name='row-platforms-radio-buttons-group'
        value={platformsSelection}
        onChange={handleChange}
        sx={{ mt: 2 }}
      >
        <FormControlLabel value='all' control={<Radio />} label='All' />
        <FormControlLabel
          value='select'
          control={<Radio />}
          label='Select manually'
          checked={platformsSelection === 'select'}
        />
      </RadioGroup>

      {platformsSelection === 'select' && (
        <Grid mt={2} spacing={1} container>
          {Object.keys(PLATFORMS).map((platform) => {
            return (
              <Grid key={platform} size={{ xs: 12, sm: 6, md: 4 }}>
                <FormControlLabel
                  key={platform}
                  checked={selectedPlatforms.includes(platform)}
                  control={
                    <Checkbox name={platform} onChange={handlePlatformSelect} />
                  }
                  label={platform}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default Platforms;
