import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField, MenuItem, Button } from '@mui/material';
import { DatePicker ,LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// components
import Iconify from '../../iconify';


// ----------------------------------------------------------------------

const INPUT_WIDTH = 160;

StaffTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onResetFilter: PropTypes.func,
  filterStaff: PropTypes.string,
  onFilterEndDate: PropTypes.func,
  onFilterStaff: PropTypes.func,
  onFilterStartDate: PropTypes.func,
  filterEndDate: PropTypes.instanceOf(Date),
  filterStartDate: PropTypes.instanceOf(Date),
  optionsStaff: PropTypes.arrayOf(PropTypes.object),
};

export default function StaffTableToolbar({
  isFiltered,
  filterName,
  onFilterName,
  filterEndDate,
  filterStaff,
  onResetFilter,
  optionsStaff,
  filterStartDate,
  onFilterStaff,
  onFilterEndDate,
  onFilterStartDate,
}) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >


      <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder="Search ..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear
        </Button>
      )}
    </Stack>
  );
}
