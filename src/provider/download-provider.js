import React, {useState} from 'react';

const DownloadContext = React.createContext({});

const DownloadProvider = (props) => {
  const [downloadInfo, setDownloadInfo] = useState({lessonName: 'asd', progress: 0});
  const [isDownloading, setIsDownloading] = useState(false)

  return <DownloadContext.Provider
    value={{downloadInfo: downloadInfo, setDownloadInfo: setDownloadInfo, isDownloading: isDownloading, setIsDownloading: setIsDownloading}}
  >
    {props.children}
  </DownloadContext.Provider>
};

export {DownloadContext, DownloadProvider};
