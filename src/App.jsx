import YoutubeShorts from './components/ai/YoutubeShorts';
import ToolSelector from './components/ai/ToolSelector';

function App() {
  return (
    <div className="app">
      <h1>Animater Vision PRO</h1>
      <ToolSelector />
      <YoutubeShorts />
      {/* Keep your existing components here */}
    </div>
  );
}
