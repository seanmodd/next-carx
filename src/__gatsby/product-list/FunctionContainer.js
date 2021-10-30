import clsx from 'clsx'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import ListIcon from '../../images/List'
import GridIcon from '../../images/Grid'
import Sort from './Sort'
import Filter from './Filter'

import filter from '../../images/filter.svg'
import sort from '../../images/sort.svg'

const useStyles = makeStyles(theme => ({
  functionContainer: {
    backgroundColor: theme.palette.primary.main,
    // maxHeight: 'rem',
    // height: 'auto',
    // position: 'fixed',
    // borderRadius: ({ option }) =>
    //   option !== null ? '10px' : '10px 10px 0px 0px',
  },
  button: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRightColor: `${theme.palette.primary.main} !important`,
    borderRadius: 25,
    backgroundColor: '#fff',
    // padding: '0.5rem 1.5rem',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  buttonGroup: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginRight: '3rem',
    // marginBottom: '3rem',
    [theme.breakpoints.down('md')]: {
      position: 'relative',
      display: 'flex',
      alignSelf: 'flex-end',
      marginRight: 0,
      marginBottom: 0,
      marginTop: '3rem',
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: '1.5rem',
    },
  },
}))

export default function FunctionContainer({
  filterOptions,
  setFilterOptions,
  option,
  setOption,
  sortOptions,
  setSortOptions,
  layout,
  setLayout,
}) {
  const classes = useStyles({ option })

  const content = () => {
    switch (option) {
      case 'sort':
        return (
          <Sort
            sortOptions={sortOptions}
            setSortOptions={setSortOptions}
            setOption={setOption}
          />
        )
      case 'filter':
        return (
          <Filter
            setOption={setOption}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        )
      default:
        const items = [
          { icon: filter, alt: 'filter' },
          { icon: sort, alt: 'sort' },
        ]

        return (
          <Grid
            item
            container
            justifyContent="space-around"
            alignItems="center"
          >
            {items.map(item => (
              <Grid item key={item.alt}>
                <IconButton onClick={() => setOption(item.alt)}>
                  <img src={item.icon} alt={item.alt} />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        )
    }
  }

  const changeLayout = option => {
    setLayout(option)
  }

  return (
    <>
      <Grid item container classes={{ root: classes.functionContainer }}>
        {content()}
      </Grid>
      {/* <Grid item container classes={{ root: classes.functionContainer }}>
        <ButtonGroup>
          <Button
            onClick={() => changeLayout('list')}
            classes={{
              outlined: clsx(classes.button, {
                [classes.selected]: layout === 'list',
              }),
            }}
          >
            <ListIcon color={layout === 'list' ? '#fff' : undefined} />
          </Button>
          <Button
            onClick={() => changeLayout('grid')}
            classes={{
              outlined: clsx(classes.button, {
                [classes.selected]: layout === 'grid',
              }),
            }}
          >
            <GridIcon color={layout === 'grid' ? '#fff' : undefined} />
          </Button>
        </ButtonGroup>
      </Grid> */}
    </>
  )
}
