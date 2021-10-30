//* Integrate 1
//! Problem: This is possible where the portion of the Recently Viewed items turns up as null and is blanked out in production and development...
import React, { useState } from 'react'
import clsx from 'clsx'
import { Link, navigate } from 'gatsby'
import { styled } from '@mui/material/styles'
import { Box, Card, Typography, Stack } from '@mui/material'
import Grid from '@material-ui/core/Grid'
// import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/core/styles'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import QuickView from './QuickView'

// import frame from '../../images/product-frame-grid.svg'

const useStyles = makeStyles(theme => ({
  frame: {
    // backgroundImage: `url(${frame})`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#7920ff',
    backgroundPosition: 'center',
    borderRadius: '4px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    height: '25rem',
    width: '25rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      height: '20rem',
      width: '20rem',
    },
    [theme.breakpoints.up('xs')]: {
      height: ({ small }) => (small ? '15rem' : undefined),
      width: ({ small }) => (small ? '15rem' : undefined),
    },
  },
  product: {
    height: '20rem',
    width: '20rem',
    [theme.breakpoints.down('xs')]: {
      height: '15rem',
      width: '15rem',
    },
    [theme.breakpoints.up('xs')]: {
      height: ({ small }) => (small ? '12rem' : undefined),
      width: ({ small }) => (small ? '12rem' : undefined),
    },
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    height: '3rem',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    width: '25rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-0.1rem',
    [theme.breakpoints.down('xs')]: {
      width: '20rem',
    },
    [theme.breakpoints.up('xs')]: {
      width: ({ small }) => (small ? '15rem' : undefined),
    },
  },
  invisibility: {
    visibility: 'hidden',
  },
  frameContainer: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}))

export const colorIndex = (product, variant, color) =>
  product.node.variants.indexOf(
    product.node.variants.filter(
      item =>
        item.color === color &&
        variant.style === item.style &&
        item.size === variant.size
    )[0]
  )

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
})

export default function ProductFrameGrid({
  product,
  variant,
  sizes,
  colors,
  selectedColor,
  selectedSize,
  setSelectedColor,
  setSelectedSize,
  hasStyles,
  disableQuickView,
  small,
  stock,
  rating,
}) {
  const classes = useStyles({ small })
  const [open, setOpen] = useState(false)

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))

  if (matchesMD && open) {
    setOpen(false)
  }

  const imageIndex = colorIndex(product, variant, selectedColor)

  // const imgURL =
  //   imageIndex !== -1
  //     ? product.node.variants[imageIndex].images[0].localFile
  //     : variant?.images[0].localFile
  //! Show Jayen, made the changes below to try and fix the blanks within the recently viewed part of the product
  const imgURL =
    imageIndex !== -1
      ? product.node.variants[imageIndex].images[0].localFile
      : variant?.images[0].localFile
  if (imgURL == null) {
    console.log('imgURL: Image is null')
  }
  const image = getImage(imgURL)

  const productName = product.node.name.split(' ')[0]
  console.log('product: ', product)
  console.log('productName: ', productName)
  console.log('product.node.name: ', product.node.name)
  console.log('variant: ', variant)
  console.log('variant.colorLabel: ', variant.colorLabel)
  //! SHOW JAYEN BELOW IS WHERE WE CAN FIX THE BLANK WITHIN RECENTLY VIEWED ITEMS!
  return (
    <>
      <Grid
        item
        classes={{
          root: clsx(classes.frameContainer, {
            [classes.invisibility]: open === true,
          }),
        }}
      >
        <Grid
          container
          direction="column"
          onClick={() =>
            matchesMD || disableQuickView
              ? navigate(
                  `/${product.node.category.name.toLowerCase()}/${product.node.name
                    .split(' ')[0]
                    .toLowerCase()}${
                    hasStyles ? `?style=${variant.style}` : null
                  }`
                )
              : setOpen(true)
          }
        >
          <Grid item classes={{ root: classes.frame }}>
            <GatsbyImage
              image={image}
              alt={product.node.name}
              className={classes.product}
            />
          </Grid>
          <Grid item classes={{ root: classes.title }}>
            <Typography variant="h6">productName:</Typography>
            <Typography variant="h5">{productName}</Typography>
          </Grid>
          <Grid item classes={{ root: classes.title }}>
            <Typography variant="h6">variant?.price: </Typography>
            <Typography variant="h5">${variant?.price}</Typography>
          </Grid>
        </Grid>
        <QuickView
          open={open}
          setOpen={setOpen}
          image={image}
          name={productName}
          price={variant?.price}
          product={product}
          variant={variant}
          sizes={sizes}
          colors={colors}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          setSelectedSize={setSelectedSize}
          setSelectedColor={setSelectedColor}
          hasStyles={hasStyles}
          stock={stock}
          rating={rating}
          imageIndex={imageIndex}
        />
      </Grid>
      //! Below is an item
      <Card>
        <Box sx={{ pt: '100%', position: 'relative' }} />

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link
            color="inherit"
            component={Link}
            to={`/dashboard/${product.node.category.name.toLowerCase()}/${product.node.name
              .split(' ')[0]
              .toLowerCase()}${hasStyles ? `?style=${variant.style}` : ''}`}
          >
            <Typography variant="subtitle2" noWrap>
              {/* {name} */}
              {product.node.name}
            </Typography>
          </Link>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* <ColorPreview colors={colors} /> */}
            <Typography variant="subtitle1">
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              >
                {/* {priceSale && fCurrency(priceSale)} */}
                {`$${variant.price}`}
              </Typography>
              &nbsp;
              {/* {fCurrency(price)} */}
              {`$${variant.price}`}
            </Typography>
          </Stack>
        </Stack>
      </Card>
      //! above is an item
    </>
  )
}
