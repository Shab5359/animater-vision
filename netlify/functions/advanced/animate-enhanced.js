// netlify/functions/advanced/animate-enhanced.js
const { Replicate } = require('replicate');

exports.handler = async (event) => {
  // Step 1: Parse input
  const { image, style } = JSON.parse(event.body);

  // Step 2: Process image
  const output = await Replicate.run(
    "cjwbw/animagine-xl:free-model",
    { input: { image, style } }
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ videoUrl: output[0] })
  };
};
