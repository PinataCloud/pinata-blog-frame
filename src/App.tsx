import { useState, useEffect } from 'react'
import sdk from '@farcaster/frame-sdk';
import { Context } from '@farcaster/frame-sdk';

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
          await sdk.actions.openUrl("https://pinata.cloud/blog");
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
    <div className='min-h-screen w-full flex flex-col items-center justify-center'>
      <h1>Frames v2 Demo</h1>
      {context && context.client.added && (
        <button
          onClick={redirect}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
        >
          View Latest Post
        </button>

      )}
      {context && !context.client.added && (
        <button
          onClick={addFrame}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        >
          Subscribe Now
        </button>
      )}
    </div>
  )
}

export default App
