import React, { useEffect, useRef } from 'react';
import './NotFound.sass';
import gsap from 'gsap';

const NotFound: React.FC = () => {
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const textElement = textRef.current;
        if (textElement) {
            const chars = textElement.textContent?.split('');
            if (chars) {
                textElement.textContent = '';

                chars.forEach((char, index) => {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.classList.add('char');
                    span.style.animationDelay = `${index * 0.05}s`;
                    textElement.appendChild(span);
                });
            }
        }
    }, []);

    return (
        <div className="notfound-container">
            <h1 ref={textRef}>404 Not Found</h1>
        </div>
    );
};

export default NotFound;
