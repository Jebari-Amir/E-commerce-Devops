import Image from "next/image";
import TiinatiiLogo from "../../../public/tiinatii_logo.jpeg";

function Loading() {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="spinner"></div>
            <Image
                className="animate-ping rounded-full h-16 w-16"
                src={TiinatiiLogo}
                alt="TiiNaTii Logo"
                priority={true}
            />
        </div>
    );
}   

export default Loading;
