import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const RootLayout = ({ children }) => {

    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default RootLayout;