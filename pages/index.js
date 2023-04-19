import { useState } from 'react';
import { Spin, message } from 'antd';
import { MdEmail } from 'react-icons/md';
import { SiGmail, SiMicrosoftoutlook } from 'react-icons/si'
import Link from 'next/link';

export default function Home() {
  const [emailInput, setEmailInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailInput }),
      });

      if (response.ok) {
        setLoading(false);
        setSuccess(true);
      } else {
        throw new Error('Error subscribing');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      setLoading(false);
      message.error('Error subscribing. Please try again later.');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center flex flex-col justify-center items-center border border-[#383838] p-9 rounded-2xl m-5">
            <h1 className="text-white font-bold text-3xl md:text-4xl mb-4">Preparing your spot outside the matrix...</h1>
            <Spin size="large" className="green-spin"/>
          </div>
        </div>
      ) : success ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center flex flex-col justify-center items-center border border-[#383838] p-9 rounded-2xl m-5">
            <h1 className="text-[#D1FE42] font-bold text-5xl md:text-8xl mb-4">Thank you!</h1>
            <p className="text-white text-sm md:text-lg m-4 max-w-md text-center">You have joined our email list and we have sent you a link to our Discord community. We will notify you about new events and exciting updates.</p>
            <div className='flex flex-col justify-center items-center border border-[#383838] px-7 py-5 rounded-xl mt-5 w-full'>
              <p className='text-white text-sm md:text-lg'>Check your email for the link</p>
              <div className='pt-3 flex justify-center w-full gap-4'>
                <Link href={'https://mail.google.com/'} className='w-full'>
                  <div className='bg-[#D1FE42] p-2 rounded-md w-full cursor-pointer flex justify-center items-center gap-2'>
                    <SiGmail />
                    <h1 className='font-bold'>GMAIL</h1>
                  </div>
                </Link>
                <Link href={'https://outlook.live.com/'} className='w-full'>
                  <div className='bg-[#D1FE42] p-2 rounded-md w-full cursor-pointer flex justify-center items-center gap-2'>
                  <SiMicrosoftoutlook />
                    <h1 className='font-bold'>OUTLOOK</h1>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center border border-[#383838] p-9 rounded-2xl m-5'>
          <div className="text-[#D1FE42] border border-[#D1FE42] px-2 rounded-full m-3 uppercase">
            <h1>Let's Escape the Matrix</h1>
          </div>
          <h1 className="text-white font-bold text-3xl md:text-6xl text-center">Join our FREE<br /> Discord community</h1>
          <p className="text-[#999999] text-sm md:text-lg m-4 max-w-md text-center">Sign up with your email address to be among the first to join our Discord server and get notified about new events and exciting updates.</p>
          <div className='flex flex-col md:flex-row justify-center items-center md:gap-4'>
            <div className='border border-[#383838] text-[#383838] rounded-md px-3 py-3 my-3 md:my-10 flex justify-center items-center gap-2'>
              <MdEmail size={20}/>
              <input type='email' value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required placeholder="Email Address" className="bg-transparent text-white placeholder:text-[#383838] outline-none w-full"/>
            </div>
            <button type='submit' className='bg-[#D1FE42] py-3 px-4 rounded-md font-bold h-fit w-full md:w-fit'>Get early access</button>
          </div>
        </form>
      )}
    </div>
  );
}