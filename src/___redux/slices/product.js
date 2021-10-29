//* Redux
//* This gets fed into _MODERN/redux/rootReducer.js
//! ALSO
//* Redux
//* This gets fed directly into ProductDetailsSumary.js via onGotoStep and addToCart !!!
import { sum, map, filter, uniqBy, reject } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

// utils
// import axios from '../../utils/axios';
import axios from 'axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  products: [],
  product: null,
  sortBy: null,
  filters: {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: '',
    rating: '',
  },
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null,
  },
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },

    // DELETE PRODUCT
    deleteProduct(state, action) {
      state.products = reject(state.products, { id: action.payload });
    },

    //  SORT & FILTER PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },

    filterProducts(state, action) {
      state.filters.gender = action.payload.gender;
      state.filters.category = action.payload.category;
      state.filters.colors = action.payload.colors;
      state.filters.priceRange = action.payload.priceRange;
      state.filters.rating = action.payload.rating;
    },

    // CHECKOUT
    getCart(state, action) {
      const cart = action.payload;

      const subtotal = sum(
        cart.map((product) => product.price * product.quantity)
      );
      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - discount;
    },

    addCart(state, action) {
      const product = action.payload;
      const isEmptyCart = state.checkout.cart.length === 0;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, product];
      } else {
        state.checkout.cart = map(state.checkout.cart, (_product) => {
          const isExisted = _product.id === product.id;
          if (isExisted) {
            return {
              ..._product,
              quantity: _product.quantity + 1,
            };
          }
          return _product;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, product], 'id');
    },

    deleteCart(state, action) {
      const updateCart = filter(
        state.checkout.cart,
        (item) => item.id !== action.payload
      );

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.activeStep = 0;
      state.checkout.cart = [];
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.billing = null;
    },

    onBackStep(state) {
      state.checkout.activeStep -= 1;
    },

    onNextStep(state) {
      state.checkout.activeStep += 1;
    },

    onGotoStep(state, action) {
      const goToStep = action.payload;
      state.checkout.activeStep = goToStep;
    },

    increaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    applyDiscount(state, action) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    },

    applyShipping(state, action) {
      const shipping = action.payload;
      state.checkout.shipping = shipping;
      state.checkout.total =
        state.checkout.subtotal - state.checkout.discount + shipping;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  addCart,
  resetCart,
  onGotoStep,
  onBackStep,
  onNextStep,
  deleteCart,
  deleteProduct,
  createBilling,
  applyShipping,
  applyDiscount,
  filterProducts,
  sortByProducts,
  increaseQuantity,
  decreaseQuantity,
} = slice.actions;

// ----------------------------------------------------------------------

export function getProducts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        '/api/strapi-graphql/query-allProducts/'
      );
      console.log(
        '👰  ⛹️‍♂️ 👰  ⛹️‍♂️ 👰  ⛹️‍♂️  🚀 🚀 👰  ⛹️‍♂️ 👰  ⛹️‍♂️ 👰  ⛹️‍♂️  🚀 ~ file: ___redux/slices/query-allProducts.js ~ from getProducts() function! On line 233 ~ return ~ response',
        response
      );
      dispatch(slice.actions.getProductsSuccess(response.data.products));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getProduct(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/products/product', {
      const response = await axios.get(
        '/api/strapi-graphql/query-singleProduct',
        {
          params: { id },
        }
      );
      //! Below are two console logs!
      console.log(
        '👰  ⛹️‍♂️ 👰  ⛹️‍♂️ 👰  ⛹️‍♂️  🚀 🚀 👰  ⛹️‍♂️ 👰  ⛹️‍♂️ 👰  ⛹️‍♂️  🚀 ~ ~ file: ___redux/slices/product.js ~ from getProduct(id) function! On line 254 ~ return ~ id',
        id
      );
      console.log(
        '👰  ⛹️‍♂️ 👰  ⛹️‍♂️ 👰  ⛹️‍♂️  🚀 🚀 👰  ⛹️‍♂️ 👰  ⛹️‍♂️ 👰  ⛹️‍♂️  🚀 ~ ~ file: ___redux/slices/product.js ~ from getProduct(id) function! On line 254 ~ return ~ response',
        response
      );
      dispatch(slice.actions.getProductSuccess(response.data.product));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

const CARQUERY = gql`
  query Variant($id: ID!) {
    variant(id: $id) {
      id
      price
      car_name
      product {
        id
        name
        category {
          id
          name
          description
        }
        promo
        featured
        description
      }
      images {
        id
        url
        height
        width
        name
      }
    }
  }
`;
const client = new ApolloClient({
  // uri: `${process.env.GATSBY_STRAPI_URL}/graphql`,
  uri: `https://admin.shopcarx.com/graphql`,
  cache: new InMemoryCache(),
});

export function getProductGraphQl(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const router = useRouter();
      // console.log('THIS IS FOR USEROUTER FROM getProductGraphQl(id): ', router);
      // const { loading, error, data } = useQuery(REVIEW, { variables: {id: id}} })
      const response = await client.query({
        query: CARQUERY,
        variables: { id },
      });
      console.log(
        '👖👖👖👖👖👖👖👖👖👖👖👖👖 ~ ~ file: ___redux/slices/product.js ~ from getProductGraphQl(id) function! On line 254 ~ return ~ id',
        id
      );
      console.log(
        '👖👖👖👖👖👖👖👖👖👖👖👖👖~ ~ file: ___redux/slices/product.js ~ from getProductGraphQl(id) function! On line 254 ~ return ~ response',
        response
      );
      // dispatch(slice.actions.getProductSuccess(response.data.product));
      // console.log(
      //   '👖👖👖👖👖👖👖👖👖👖👖👖👖 ~ file: product.js ~ line 325 ~ return ~ response.data.product',
      //   response.data.product
      // );
      dispatch(slice.actions.getProductSuccess(response.data));
      console.log(
        '👖👖👖👖👖👖👖👖👖👖👖👖👖 ~ file: product.js ~ line 325 ~ return ~ response.data',
        response.data
      );
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
