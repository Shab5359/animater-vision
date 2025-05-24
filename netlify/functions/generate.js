const { Replicate } = require('replicate');

exports.handler = async (event) => {
  // 1. Get input from frontend
  const { text, language } = JSON.parse(event.body);
  
  // 2. Initialize Replicate
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY,
  });

  // 3. Run the AI model
  const output = await replicate.run(
    "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
    {
      input: {
        prompt: text,
        width: 512,
        height: 512,
        duration: 10
      }
    }
  );

  // 4. Return the video URL
  return {
    statusCode: 200,
    body: JSON.stringify({ videoUrl: output[0].url })
  };
};
