import React, { useState } from 'react';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import './App.css';

function VideoPlayer() {
  const [videoSrc, setVideoSrc] = useState('');
  const [message, setMessage] = useState('Click Start to transcode');


const ffmpeg = createFFmpeg({
  corePath: "./node_modules/@ffmpeg/core/ffmpeg-core.js",
  log: true,
});
  const doTranscode = async () => {
    setMessage('Loading ffmpeg-core.js');
    await ffmpeg.load();
    setMessage('Start transcoding');
    await ffmpeg.write('first.mp4', 'http://127.0.0.1:3000/video/first.mp4');
    await ffmpeg.transcode('first.mp4', 'first.avi');
    setMessage('Complete transcoding');
    const data = ffmpeg.read('first.avi');
    setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/avi' })));
  };
  return (
    <div className="App">
      <p/>
      <video src={videoSrc} controls></video><br/>
      <button onClick={doTranscode}>Start</button>
      <p>{message}</p>
    </div>
  );
}

export default VideoPlayer;