import { useState, useEffect } from 'react'
import sdk from '@farcaster/frame-sdk';
import { Context } from '@farcaster/frame-sdk';
import pinnie from "./assets/pinnie.png"

function App() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();

  useEffect(() => {
    const load = async () => {
      const ctx = await sdk.context;
      setContext(ctx);
      sdk.actions.ready();

      if (ctx.client.added) {
        try {
          sdk.actions.openUrl("https://pinata.cloud/blog");
          sdk.actions.close()
        } catch (error) {
          console.error("Redirect error:", error);
        }
      }
    };

    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  async function addFrame() {
    try {
      await sdk.actions.addFrame()
    } catch (error) {
      console.log(error)
    }
  }

  async function redirect() {
    try {
      await sdk.actions.openUrl("https://pinata.cloud/blog")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center bg-[#171420]'>
      <img className='max-h-[200px] relative -mb-16 z-1' src={pinnie} alt="" />
      <div className='bg-white text-black rounded-[30px] z-5 p-4 min-h-[200px] flex flex-col items-center justify-center gap-2 mx-4 max-w-sm'>
        <h1 className='font-black text-4xl text-center'>PINATA BLOG NOTIFCATIONS</h1>
        {!context && (
          <p className='text-center'>View this Frame in Warpcast to get in-app notifications for new blog posts!</p>
        )}
        {context && (
          <p className='text-center'>Add this frame to automatically subscribe for new blog post notifcations!</p>
        )}

        {context && context.client.added && (
          <button
            onClick={redirect}
            className="bg-[#6E57FF] text-white font-semibold py-2 px-4 rounded-full m-2"
          >
            View Latest Post
          </button>

        )}
        {context && !context.client.added && (
          <button
            onClick={addFrame}
            className="bg-[#6E57FF] text-white py-2 font-semibold px-4 rounded-full m-2"
          >
            Subscribe Now
          </button>
        )}
      </div>
    </div>
  )
}

export default App
