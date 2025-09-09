'use client';

import React, { useEffect } from 'react';

const GoogleTranslateManager = () => {
  // This function sets a cookie that the Google Translate script reads on page load.
  // This is the most reliable method and requires a single page refresh.
  const changeLanguage = (langCode) => {
    document.cookie = `googtrans=/en/${langCode};path=/;domain=${window.location.hostname};`;
    window.location.reload();
  };

  useEffect(() => {
    // Expose the changeLanguage function to the global window object
    window.changeGoogleTranslateLanguage = changeLanguage;

    // Inject CSS to hide the Google Translate banner and any layout shifts it causes
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

    // Runtime hard kill for banner: handle late injection and route changes
    const forceHideBanner = () => {
      try {
        const htmlEl = document.documentElement;
        const bodyEl = document.body;
        if (htmlEl && (htmlEl.style.top && htmlEl.style.top !== '0px')) htmlEl.style.top = '0px';
        if (bodyEl && (bodyEl.style.top && bodyEl.style.top !== '0px')) bodyEl.style.top = '0px';

        const bannerFrame = document.querySelector('iframe.goog-te-banner-frame');
        if (bannerFrame) {
          bannerFrame.style.setProperty('display', 'none', 'important');
          bannerFrame.style.setProperty('visibility', 'hidden', 'important');
          bannerFrame.style.setProperty('height', '0px', 'important');
          bannerFrame.style.setProperty('opacity', '0', 'important');
          bannerFrame.style.setProperty('z-index', '-1', 'important');
        }

        const skipTranslate = document.querySelector('.skiptranslate');
        if (skipTranslate) {
          skipTranslate.setAttribute('aria-hidden', 'true');
          skipTranslate.style.setProperty('display', 'none', 'important');
          skipTranslate.style.setProperty('visibility', 'hidden', 'important');
          skipTranslate.style.setProperty('z-index', '-1', 'important');
        }

        const tooltip = document.getElementById('goog-gt-tt');
        if (tooltip) tooltip.style.display = 'none';
      } catch (_) {}
    };

    // Run immediately, then a few times after load to catch late insertions
    forceHideBanner();
    const intervalId = setInterval(forceHideBanner, 300);
    const stopAfterMs = 4000;
    const timeoutId = setTimeout(() => clearInterval(intervalId), stopAfterMs);

    // Observe DOM mutations to keep hiding if Google reinserts elements
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
      } catch (_) {}
    };
  }, []);

  // This div is required by Google but will be hidden.
  return <div id="google_translate_element" style={{ display: 'none' }}></div>;
};

export default GoogleTranslateManager;