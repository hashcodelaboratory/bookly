import {HigherOrderComponent} from "bookly/types/higher-order-component";
import {BookContextProvider} from "bookly/context/book-context-provider";

export const withBookContext: HigherOrderComponent = (WrappedComponent) =>
  // eslint-disable-next-line react/display-name
  (props) =>
    <BookContextProvider>
      <WrappedComponent {...props}/>
    </BookContextProvider>