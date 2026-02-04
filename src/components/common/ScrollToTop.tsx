import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, search, key } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname, search, key]);

    return null;
};

export default ScrollToTop;
