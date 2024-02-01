import "./Loader.css"
import Lottie from "lottie-react";
import loading from "../../assets/LoaderAnimation/loading.json"

const Loader = () => {
    return (
        <div className="wrapper">
            <Lottie animationData={loading} loop={true} style={{width: 100}}/>
        </div>
    )
}

export default Loader;