import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
    behavior?: ScrollBehavior;
}

export const ScrollToTop = ({ behavior = 'smooth' }: ScrollToTopProps) => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: behavior
        });
    }, [location, behavior]);

    return null;
};