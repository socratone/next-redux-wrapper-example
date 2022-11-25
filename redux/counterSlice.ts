import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  // getStaticProps나 getServerSideProps에서 항상 호출된다.
  // 위 함수에서 dispatch된 action을 모두 합친 뒤 여기서 payload로 가져와 업데이트한다.
  // client의 state를 덮어 쓰는 실수를 방지하기 위해서 server와 client로 나눠서 관리하는 것을 추천한다.
  // https://github.com/kirill-konshin/next-redux-wrapper#server-and-client-state-separation
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.counter,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
