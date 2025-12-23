
'use client';

import React, { useEffect } from 'react';

const GoogleTranslateManager = () => {
    // --- THIS IS THE STRONGER COOKIE IMPLEMENTATION YOU REQUESTED ---

    // A helper function to forcefully delete cookies by trying all common variations.
    const deleteCookie = (name) => {
        const domain = window.location.hostname;
        const baseDomain = domain.replace(/^www\./, '');
        const expires = "; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        // Attempt deletion on all common paths and domain variations
        document.cookie = `${name}=; path=/; domain=${domain}${expires}`;
        document.cookie = `${name}=; path=/; domain=.${baseDomain}${expires}`;
        document.cookie = `${name}=; path=/;${expires}`;
    };

    const changeLanguage = (langCode) => {
        // Step 1: Forcefully delete any old 'googtrans' cookie to prevent conflicts.
        deleteCookie('googtrans');

        // Step 2: After a short delay, set the new cookie using multiple methods for reliability.
        setTimeout(() => {
            // Method A (Old, more specific): Sets the cookie with the exact hostname.
            document.cookie = `googtrans=/en/${langCode};path=/;domain=${window.location.hostname};`;
            
            // Method B (New, more general): Sets the cookie without the domain.
            document.cookie = `googtrans=/en/${langCode};path=/;`;
            
            // Step 3: Reload the page to apply the translation.
            window.location.reload();
        }, 100);
    };


    useEffect(() => {
        // Expose the changeLanguage function to the global window object
        window.changeGoogleTranslateLanguage = changeLanguage;

        // --- YOUR EXISTING CSS AND JS LOGIC TO HIDE THE BANNER ---
        const styleId = 'google-translate-banner-fix';
        if (!document.getElementById(styleId)) {
            const css = `
              .goog-te-banner-frame.skiptranslate { display: none !important; }
              body { top: 0 !important; position: static !important; }
              html { top: 0 !important; }
              .goog-te-banner-frame { display: none !important; height: 0 !important; visibility: hidden !important; opacity: 0 !important; z-index: -1 !important; }
              .skiptranslate { z-index: 0 !important; }
              .goog-te-balloon-frame { display: none !important; }
              #goog-gt-tt, .goog-te-balloon-frame { display: none !important; } 
              .goog-text-highlight { background: none !important; box-shadow: none !important; }
              .goog-te-menu-frame.skiptranslate { display: none !important; }
              .goog-tooltip { display: none !important; }
              .goog-tooltip:hover { display: none !important; }
            `;
            const style = document.createElement('style');
            style.id = styleId;
            style.type = 'text/css';
            style.appendChild(document.createTextNode(css));
            document.head.appendChild(style);
        }

        const forceHideBanner = () => {
            try {
                const htmlEl = document.documentElement;
                if (htmlEl && (htmlEl.style.top && htmlEl.style.top !== '0px')) htmlEl.style.top = '0px';
                
                const bannerFrames = document.querySelectorAll('iframe.goog-te-banner-frame');
                bannerFrames.forEach(frame => {
                    frame.style.setProperty('display', 'none', 'important');
                });
            } catch (_) { }
        };

        const intervalId = setInterval(forceHideBanner, 300);
        const timeoutId = setTimeout(() => clearInterval(intervalId), 4000);
        const observer = new MutationObserver(() => forceHideBanner());
        observer.observe(document.documentElement, { childList: true, subtree: true });

        // Initialize the Google Translate script
        const googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                { pageLanguage: 'en' },
                'google_translate_element'
            );
        };

        // Add the Google Translate script to the page
        const scriptId = 'google-translate-script';
        if (!document.getElementById(scriptId)) {
            const addScript = document.createElement('script');
            addScript.id = scriptId;
            addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            addScript.async = true;
            document.body.appendChild(addScript);
            window.googleTranslateElementInit = googleTranslateElementInit;
        }

        return () => {
            delete window.changeGoogleTranslateLanguage;
            delete window.googleTranslateElementInit;
            try {
                clearInterval(intervalId);
                clearTimeout(timeoutId);
                observer.disconnect();
            } catch (_) { }
        };
    }, []);

    // This div is required by Google but will be hidden.
    return <div id="google_translate_element" style={{ display: 'none' }}></div>;
};

export default GoogleTranslateManager;