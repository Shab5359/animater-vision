import { useState } from 'react';
import axios from 'axios';
import './styles.css';

export default function AnimaterVision() {
  const [input, setInput] = useState('');
  const [video, setVideo] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateVideo = async () => {
    setIsGenerating(true);
    try {
      const { data } = await axios.post('/.netlify/functions/generate', {
        text: input,
        language: /[\u0900-\u097F]/.test(input) ? 'hi' : 'en'
      });
      setVideo(data.videoUrl);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container">
      <h1>ANIMATER VISION</h1>
      
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe your video in Hindi or English..."
        rows={5}
      />
      
      <button 
        onClick={generateVideo} 
        disabled={!input || isGenerating}
      >
        {isGenerating ? 'Creating...' : 'Generate Video'}
      </button>

      <div className="image-upload">
        <h3>OR Upload Image</h3>
        <input 
          type="file" 
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image', file);
            
            const { data } = await axios.post('/.netlify/functions/animate', formData);
            setVideo(data.videoUrl);
          }}
        />
      </div>

      {video && (
        <div className="video-container">
          <video src={video} controls />
          <div className="share-buttons">
            <button onClick={() => window.open(`whatsapp://send?text=${encodeURIComponent(video)}`)}>
              Share to WhatsApp
            </button>
            <button onClick={() => {
              const link = document.createElement('a');
              link.href = video;
              link.download = 'animater-video.mp4';
              link.click();
            }}>
              Download MP4
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
