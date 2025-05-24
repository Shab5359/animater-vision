// src/components/ai/ToolSelector.jsx
import { useState } from 'react';

export default function ToolSelector() {
  // Step 1: State setup
  const [activeTool, setActiveTool] = useState('youtube');

  // Step 2: Render UI
  return (
    <div className="tool-selector">
      <button onClick={() => setActiveTool('youtube')}>
        YouTube Shorts
      </button>
      <button onClick={() => setActiveTool('animate')}>
        AI Animation
      </button>
      
      {activeTool === 'youtube' && <YoutubeShorts />}
      {activeTool === 'animate' && <EnhancedAnimator />}
    </div>
  );
}
