import React, { useState, useEffect, useRef } from 'react';

const ModifiedCookieConsentBanner = () => {
  const [acceptCount, setAcceptCount] = useState(0);
  const [showWindows98, setShowWindows98] = useState(false);
  const [showBlackScreen, setShowBlackScreen] = useState(false);
  const [popups, setPopups] = useState([]);
  const [showErrorMessage, setShowErrorMessage] = useState(true);
  const audioRef = useRef(null);

  const funnyMessages = [
    'Oops! You broke the internet!',
    'Error 404: Cookie not found',
    'Warning: This action may cause spontaneous dance parties',
    'Alert: Your computer needs a hug',
    'Caution: Clicking may result in unexpected kitten videos',
  ];

  useEffect(() => {
    audioRef.current = new Audio('/src/assets/winxperr.mp3');
  }, []);

  const handleAccept = () => {
    setAcceptCount((prevCount) => prevCount + 1);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((e) => console.error('Error playing audio:', e));
    }

    const newPopup = {
      id: Date.now(),
      message: funnyMessages[Math.floor(Math.random() * funnyMessages.length)],
      style: {
        top: `${Math.random() * 70}%`,
        left: `${Math.random() * 70}%`,
      },
    };
    setPopups((prev) => [...prev, newPopup]);

    if (acceptCount >= 2) {
      setTimeout(() => {
        setShowBlackScreen(true);
        setTimeout(() => {
          setShowWindows98(true);
          setShowErrorMessage(true);
        }, 2000);
      }, 1000);
    }
  };

  const handleReturnToNormal = () => {
    setShowWindows98(false);
    setShowBlackScreen(false);
    setAcceptCount(0);
    setPopups([]);
  };

  const Windows98Screen = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeWindows, setActiveWindows] = useState([]);

    useEffect(() => {
      const timer = setInterval(() => setCurrentTime(new Date()), 1000);
      return () => clearInterval(timer);
    }, []);

    const openWindow = (content, title, width = 300, height = 200) => {
      setActiveWindows((prev) => [
        ...prev,
        { id: Date.now(), content, title, width, height },
      ]);
    };

    const closeWindow = (id) => {
      setActiveWindows((prev) => prev.filter((window) => window.id !== id));
    };

    const DesktopIcon = ({ icon, label, onClick }) => (
      <div
        className="w-20 text-center text-white cursor-pointer mb-4"
        onClick={onClick}
      >
        <div className="bg-transparent w-16 h-16 mx-auto mb-1 flex items-center justify-center">
          <span className="text-4xl">{icon}</span>
        </div>
        <span className="text-xs bg-blue-800">{label}</span>
      </div>
    );

    const myComputerContent = (
      <div className="flex flex-wrap p-2">
        <DesktopIcon icon="💾" label="3½ Floppy (A:)" onClick={() => {}} />
        <DesktopIcon icon="💽" label="Local Disk (C:)" onClick={() => {}} />
        <DesktopIcon icon="📀" label="CD Drive (D:)" onClick={() => {}} />
        <DesktopIcon icon="🖨️" label="Printers" onClick={() => {}} />
        <DesktopIcon icon="⚙️" label="Control Panel" onClick={() => {}} />
      </div>
    );

    const oldGoogleContent = (
      <div className="bg-white p-4 h-full">
        <div className="text-center mb-4">
          <h1
            className="text-6xl font-bold mb-4"
            style={{ fontFamily: 'serif', color: '#4285F4' }}
          >
            Google!
          </h1>
          <input
            type="text"
            className="border border-gray-300 p-2 w-64"
            placeholder="Search the web using Google!"
          />
          <div className="mt-2">
            <button className="bg-gray-200 px-2 py-1 mr-2">
              Google Search
            </button>
            <button className="bg-gray-200 px-2 py-1">I'm Feeling Lucky</button>
          </div>
        </div>
        <p className="text-sm text-center">Copyright ©1998 Google Inc.</p>
      </div>
    );

    const doomContent = (
      <div className="h-full flex flex-col items-center justify-center bg-black text-green-500 font-mono">
        <div className="mb-4 text-2xl">DOOM</div>
        <div className="border border-green-500 p-4 mb-4">
          <pre>
            {String.raw`
     /\\\\'-._
    (   '.'.-
     \. \.\  '\
       \.\';   \
         ' \\   )
            '-'-'
            `}
          </pre>
        </div>
        <div className="text-center">
          <div>New Game</div>
          <div>Load Game</div>
          <div>Options</div>
          <div>Quit</div>
        </div>
        <div className="mt-4 text-xs">Press any key to start</div>
      </div>
    );

    return (
      <div className="fixed inset-0 bg-teal-700 flex flex-col">
        <div className="flex-grow p-4 flex flex-col items-start">
          <DesktopIcon
            icon="🖥️"
            label="My Computer"
            onClick={() =>
              openWindow(myComputerContent, 'My Computer', 400, 300)
            }
          />
          <DesktopIcon
            icon="📂"
            label="My Documents"
            onClick={() =>
              openWindow(
                'Your documents are empty... or are they?',
                'My Documents'
              )
            }
          />
          <DesktopIcon
            icon="🌐"
            label="Internet Explorer"
            onClick={() =>
              openWindow(oldGoogleContent, 'Internet Explorer', 800, 600)
            }
          />
          <DesktopIcon
            icon="👾"
            label="Doom"
            onClick={() => openWindow(doomContent, 'Doom', 640, 400)}
          />
          <DesktopIcon
            icon="🚪"
            label="Exit Windows"
            onClick={handleReturnToNormal}
          />
        </div>

        {/* Windows */}
        {activeWindows.map((window) => (
          <div
            key={window.id}
            className="absolute bg-gray-200 border-2 border-gray-400 shadow-lg"
            style={{
              top: '20%',
              left: '30%',
              width: window.width,
              height: window.height,
            }}
          >
            <div className="bg-blue-800 text-white p-1 flex justify-between items-center cursor-move">
              <span>{window.title}</span>
              <button
                onClick={() => closeWindow(window.id)}
                className="text-white"
              >
                X
              </button>
            </div>
            <div
              className="p-2 overflow-auto"
              style={{ height: 'calc(100% - 30px)' }}
            >
              {window.content}
            </div>
          </div>
        ))}

        {/* Taskbar */}
        <div className="bg-gray-300 h-10 flex items-center px-2 border-t-2 border-gray-400">
          <button className="bg-gray-400 text-black px-4 py-1 rounded mr-2 font-bold">
            Start
          </button>
          {activeWindows.map((window) => (
            <div
              key={window.id}
              className="bg-gray-400 text-black px-2 py-1 mr-2 text-sm"
            >
              {window.title}
            </div>
          ))}
          <div className="ml-auto bg-gray-200 text-black px-2 py-1 text-xs border border-gray-500">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>

        {/* Error Message */}
        {showErrorMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-200 p-4 border-2 border-gray-400 shadow-lg w-96">
              <div className="bg-blue-800 text-white p-1 mb-4">Error</div>
              <p className="mb-4">
                You accepted the cookies too hard and ended up on an older
                machine. Sorry.
              </p>
              <div className="text-center">
                <button
                  className="bg-gray-300 px-4 py-2 border border-gray-400"
                  onClick={() => setShowErrorMessage(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (showWindows98) {
    return <Windows98Screen />;
  }

  if (showBlackScreen) {
    return <div className="fixed inset-0 bg-black" />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed bottom-0 left-0 w-full bg-blue-500 text-white p-4 flex justify-between items-center">
        <div>
          <p className="font-bold">This website uses cookies</p>
          <p>
            We use cookies to ensure you get the best experience on our website.
          </p>
        </div>
        <button
          onClick={handleAccept}
          className="bg-white text-blue-500 px-4 py-2 rounded"
        >
          Accept
        </button>
      </div>
      {popups.map((popup) => (
        <div
          key={popup.id}
          className="fixed bg-yellow-300 border-2 border-yellow-500 p-2 rounded shadow-lg z-40"
          style={popup.style}
        >
          {popup.message}
        </div>
      ))}
    </div>
  );
};

export default ModifiedCookieConsentBanner;
