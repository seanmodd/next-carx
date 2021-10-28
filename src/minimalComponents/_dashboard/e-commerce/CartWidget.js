import React from 'react'
import { sum } from 'lodash'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import shoppingCartFill from '@iconify/icons-eva/shopping-cart-fill'
// material
import { styled } from '@mui/material/styles'
import { Badge } from '@mui/material'
// redux
import { useSelector } from 'src/redux/store'
// routes
// import { PATH_DASHBOARD } from '../../../routes/paths'

// ----------------------------------------------------------------------

const RootStyle = styled(Link)(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: theme.shape.borderRadiusMd,
  borderBottomLeftRadius: theme.shape.borderRadiusMd,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}))

// ----------------------------------------------------------------------

export default function CartWidget() {
  const { checkout } = useSelector(state => state.product)
  const totalItems = sum(checkout.cart.map(item => item.quantity))

  return (
    <RootStyle href="/dashboard/e-commerce/checkout">
      <Badge showZero badgeContent={totalItems} color="error" max={99}>
        <Icon icon={shoppingCartFill} width={24} height={24} />
      </Badge>
    </RootStyle>
  )
}
