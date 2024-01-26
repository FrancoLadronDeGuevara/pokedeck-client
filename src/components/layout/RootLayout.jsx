import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const RootLayout = ({children}) => {
    
    return (
        <>
            <div>
                <Navbar />
                <main>
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}

export default RootLayout;