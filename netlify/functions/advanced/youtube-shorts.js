// netlify/functions/advanced/youtube-shorts.js
const { fetch } = require('youtube-dl-exec');
const SunoAI = require('suno-api');

exports.handler = async (event) => {
  // Step 1: Get input
  const { url, duration = 15 } = JSON.parse(event.body);

  // Step 2: Download audio
  const audio = await fetch(url, { format: 'mp3', duration });

  // Step 3: Generate music
  const music = await SunoAI.generate({
    prompt: "background music",
    duration
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      videoUrl: await combineAssets(audio, music)
    })
  };
};
