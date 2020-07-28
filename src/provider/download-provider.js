import React, {useState} from 'react';

const DownloadContext = React.createContext({});

const DownloadProvider = (props) => {
  const [downloadInfo, setDownloadInfo] = useState({lessonName: '', progress: 0});
  const [isDownloading, setIsDownloading] = useState(false)
  const [sectionId, setSectionId] = useState('')

  return <DownloadContext.Provider
    value={{downloadInfo: downloadInfo, setDownloadInfo: setDownloadInfo, isDownloading: isDownloading, setIsDownloading: setIsDownloading, sectionId, setSectionId}}
  >
    {props.children}
  </DownloadContext.Provider>
};

export {DownloadContext, DownloadProvider};
