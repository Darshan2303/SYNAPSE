import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

export const IpLinkWithQR: React.FC<{ ip: string; port: string; className?: string }> = ({ ip, port, className }) => {
  const [showQR, setShowQR] = useState(false);
  const url = `http://${ip}:${port}`;

  useEffect(() => {
    const handleCloseOthers = (e: CustomEvent) => {
      if (e.detail !== url) {
        setShowQR(false);
      }
    };
    window.addEventListener('qr-opened', handleCloseOthers as EventListener);
    return () => {
      window.removeEventListener('qr-opened', handleCloseOthers as EventListener);
    };
  }, [url]);

  return (
    <div className={`relative ${className || 'mb-1 last:mb-0'}`}>
      <div className="flex bg-hack-bg rounded border border-hack-border w-full">
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-hack-text flex-1 p-2 hover:text-hack-primary transition-colors block text-xs truncate"
        >
          {url}
        </a>
        <button 
          onClick={(e) => {
            e.preventDefault();
            const newState = !showQR;
            setShowQR(newState);
            if (newState) {
                window.dispatchEvent(new CustomEvent('qr-opened', { detail: url }));
            }
          }}
          className="p-2 text-hack-muted hover:text-hack-primary border-l border-hack-border transition-colors flex items-center justify-center cursor-pointer"
          title="Show QR Code"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>
        </button>
      </div>
      
      {showQR && (
        <div className="mt-2 p-2 bg-white rounded shadow-lg border border-gray-200 flex justify-center mx-auto w-fit">
          <QRCode value={url} size={128} />
        </div>
      )}
    </div>
  );
};
