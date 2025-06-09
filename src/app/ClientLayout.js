'use client';

import { Provider } from "react-redux";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { store } from "./store/store";

export default function ClientLayout({ children }) {
    return (
        <Provider store={store}>
            <Navbar />
            {children}
            <Footer />
        </Provider>
    );
}