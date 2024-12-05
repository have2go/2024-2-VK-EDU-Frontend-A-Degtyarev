import React, { useEffect, useRef, useState } from "react";
import "./LazyImage.scss";

export const LazyImage = ({ src, alt, className }) => {
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef(null);

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

    return (
        <img
            ref={imgRef}
            src={isVisible ? src : ""}
            alt={alt}
            className={`lazyimg  ${className} ${isVisible ? "lazyimg_visible" : ""}`}
            draggable={false}
        />
    );
};
