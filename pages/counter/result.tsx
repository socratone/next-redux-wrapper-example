import { GetServerSideProps } from 'next';
import { useSelector } from 'react-redux';
import { incrementByAmount } from '../../redux/counterSlice';
import { AppState, wrapper } from '../../redux/store';

const Result = () => {
  // 서버에서 dispatch하여 HYDRATE action으로 변경된 값을 클라이언트에서 가져옴
  const counter = useSelector((state: AppState) => state.counter);

  return (
    <div>
      <p>counter state : {counter.value}</p>
    </div>
  );
};

// getStaticProps나 getServerSideProps를 포함한 페이지가 열릴 때마다 HYDRATE action이 dispatch 된다.
// 이 action의 payload에는 static generation이나 server side rendering에서의 state를 포함한다.
// (아마도 getServerSideProps 내부에서 dispatch된 state를 말하는 듯하다.)
// https://github.com/kirill-konshin/next-redux-wrapper#state-reconciliation-during-hydration
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const amount = Number(context.query.amount);

    // 서버에서 state dispatch
    await store.dispatch(incrementByAmount(amount));

    return {
      props: {},
    };
  });

export default Result;
