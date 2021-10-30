import Slide from '@material-ui/core/Slide'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useStaticQuery, graphql } from 'gatsby'
import FunctionContainer from './FunctionContainer'
import DescriptionContainer from './DescriptionContainer'
import Layout from '../ui/layout'
import Header from '../ui/header'

const useStyles = makeStyles(theme => ({
  wrapper: {
    height: '145px',
    // zIndex: 9999,
    // marginBottom: '5000px',
    width: '100%',
    backgroundColor: '#f0f0f0',
    // position: 'fixed',
  },
  toolbar: {
    // border: `5px solid ${theme.palette.primary.main}`,
    // borderRadius: 25,
    width: '100%',
    // position: 'fixed',

    height: 'auto',
    // marginTop: '5rem',
    marginBottom: '5rem',
  },
  DescriptionContainerStyles: {
    marginTop: '5rem',
    marginBottom: '5rem',
  },
}))
function HideOnScroll(props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}
export default function DynamicToolbar({
  filterOptions,
  setFilterOptions,
  name,
  description,
  layout,
  setLayout,
  sortOptions,
  setSortOptions,
}) {
  const classes = useStyles()
  const [option, setOption] = useState(null)
  const data = useStaticQuery(graphql`
    query GetCategoriesAll {
      allStrapiCategory {
        edges {
          node {
            name
            strapiId
          }
        }
      }
    }
  `)
  return (
    <HideOnScroll>
      <div className={classes.wrapper}>
        <Grid direction="column" classes={{ root: classes.toolbar }}>
          {/* <Header categories={data.allStrapiCategory.edges} /> */}
          <FunctionContainer
            option={option}
            setOption={setOption}
            layout={layout}
            setLayout={setLayout}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            sortOptions={sortOptions}
            setSortOptions={setSortOptions}
          />
          {option === null && (
            <DescriptionContainer
              layout={layout}
              setLayout={setLayout}
              name={name}
              className={classes.DescriptionContainerStyles}
              description={description}
            />
          )}
        </Grid>
      </div>
    </HideOnScroll>
  )
}
