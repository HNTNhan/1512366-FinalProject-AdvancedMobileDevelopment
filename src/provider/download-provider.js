import React, {useState} from 'react';

const DownloadContext = React.createContext({});

const DownloadProvider = (props) => {
  const [downloadId, setDownloadId] = useState({sectionId: '', courseId: ''})
  const [list, setList] = useState(null)
  const [startDownload, setStartDownload] = useState(false)
  const [downloadData, setDownloadData] = useState({
    listAccountAndCourseDownload: {},
    data: [],
    detail: {},
    numberOrder: -1,
    id: '',
    downloadSection: true,
  })
  const [videoRef, setVideoRef] = useState(0)

  return <DownloadContext.Provider
    value={{
      downloadId: downloadId, setDownloadId: setDownloadId, downloadData: downloadData, setDownloadData: setDownloadData,
      list: list, setList: setList, startDownload: startDownload, setStartDownload: setStartDownload, videoRef: videoRef,
      setVideoRef: setVideoRef
    }}
  >
    {props.children}
  </DownloadContext.Provider>
};

export {DownloadContext, DownloadProvider};
