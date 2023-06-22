import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/global.css";
import { Provider } from "react-redux";
import { RootState, store } from "@/store/store";
import Wrapper from "@/components/wrapper/wrapper";
import { useSelector } from "react-redux";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Wrapper>
        <div>
          <Component {...pageProps} />
        </div>
      </Wrapper>
    </Provider>
  );
}
