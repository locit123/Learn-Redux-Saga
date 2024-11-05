import { City, ListParams } from 'models';
import React, { ChangeEvent, useRef } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Search } from '@mui/icons-material';

export interface StudentFiltersProps {
  filter: ListParams;
  cityList: City[];
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

const StudentFilters = ({ filter, cityList, onChange, onSearchChange }: StudentFiltersProps) => {
  const inputRef = useRef<HTMLInputElement>();
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };

    onSearchChange(newFilter);
  };

  const handleCityChange = (
    e: SelectChangeEvent<
      Event & {
        target: {
          value: string;
          name: string;
        };
      }
    >,
  ) => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined,
    };

    onChange(newFilter);
  };

  const handleSortChange = (
    e: SelectChangeEvent<`${string}.undefined` | `${string}.desc` | `${string}.asc`>,
  ) => {
    if (!onChange) return;
    const value = e.target.value;
    const [_sort, _order] = (value as string).split('.');
    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };

    onChange(newFilter);
  };

  const handleClearFilterChange = () => {
    if (!onChange) return;

    let newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: undefined,
    };

    onChange(newFilter);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <OutlinedInput
              onChange={handleSearchChange}
              id="searchByName"
              endAdornment={<Search />}
              label={'Search by name'}
              defaultValue={filter.name_like}
              inputRef={inputRef}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl sx={{ m: 1 }} size="small" fullWidth>
            <InputLabel id="filterByCity">Filter by city</InputLabel>
            <Select
              labelId="filterByCity"
              label="filter by city"
              value={filter.city || ''}
              onChange={handleCityChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <FormControl sx={{ m: 1 }} size="small" fullWidth>
            <InputLabel id="sortBy">Sort</InputLabel>
            <Select
              labelId="sortBy"
              label="Sort"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}
            >
              <MenuItem value="">
                <em>No sort</em>
              </MenuItem>
              <MenuItem value={'name.asc'}>Name ASC</MenuItem>
              <MenuItem value={'name.desc'}>Name DESC</MenuItem>
              <MenuItem value={'mark.asc'}>Mark ASC</MenuItem>
              <MenuItem value={'mark.desc'}>Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={1}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}
        >
          <Button color="primary" fullWidth variant="outlined" onClick={handleClearFilterChange}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentFilters;
