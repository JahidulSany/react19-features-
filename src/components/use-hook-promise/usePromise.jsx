import { Suspense, use } from 'react';
import { useState } from 'react';

const fetchMessage = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("🅿️🚙")
        }, 1500);
    })
}

const MessageContent = ({ messagePromise }) => {
    const textMessage = use(messagePromise); 
  return (
    <p className='text-xl'>Follow the Sign: {textMessage}</p>
  )
}


const MessageContainer = ({ messagePromise }) => {
    return (
        <Suspense fallback={<p className='text-xl'>Downloading Message...</p>}>
            <MessageContent messagePromise={messagePromise} />
        </Suspense>
    );
}

export default function Message() {
    const [show, setShow] = useState(false);
    const [messagePromise, setMessagePromise] = useState(null)

    const handleDownload = () => {
        setMessagePromise(fetchMessage())
        setShow(true);
    }
  return show ? (
      <MessageContainer messagePromise={ messagePromise } />
  ) : (
    <button onClick={handleDownload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Download message
    </button>
  );
}
