const { Replicate } = require('replicate');

exports.handler = async (event) => {
  // 1. Get uploaded image
  const formData = await event.body;
  
  // 2. Initialize Replicate
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY,
  });

  // 3. Run the animation model
  const output = await replicate.run(
    "cjwbw/animagine-xl:af1a68a271597d546f8eaa49fc1b17f7f45bd422beaf034d8570a1a2b5647e1d",
    { input: { image: formData.image } }
  );

  // 4. Return animated video
  return { 
    statusCode: 200, 
    body: JSON.stringify({ videoUrl: output[0] }) 
  };
};
