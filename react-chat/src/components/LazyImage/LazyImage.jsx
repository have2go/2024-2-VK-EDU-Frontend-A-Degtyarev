import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import "./LazyImage.scss";

export const LazyImage = ({ src, alt, className }) => {
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef(null);

    const imgClass = cn(className, "lazyimg", { lazyimg_visible: isVisible });

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, []);

    return <img ref={imgRef} src={isVisible ? src : ""} alt={alt} className={imgClass} draggable={false} />;
};
