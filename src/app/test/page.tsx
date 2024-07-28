"use client"
import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { Segment } from 'semantic-ui-react';


const LinkImage = () => {
  return (
    <div>
      <a href="http://localhost:3000/products/crtvs" target="_blank" rel="noopener noreferrer">
        <img src="ss.png" alt="Product" style={{ width: '40%' }} />
      </a>
      <p>
        Patterned shirt Slim Fit<br />
        130 EGP<br />
        <a href="http://localhost:3000/products/crtvs" target="_blank" rel="noopener noreferrer">
          Show Details
        </a>
      </p>
    </div>
  );
};




const LinkImagee = () => {
  return (
    <div>
      <a href="http://localhost:3000/products/crtvs" target="_blank" rel="noopener noreferrer">
        <img src="1.png" alt="Product" style={{ width: '40%' }} />
      </a>
      <p>
        Patterned shirt Slim Fit<br />
        130 EGP<br />
        <a href="http://localhost:3000/products/crtvs" target="_blank" rel="noopener noreferrer">
          Show Details
        </a>
      </p>
    </div>
  );
};


// {
//   id: 'Greet',
//   component: <LinkImage />,
//   trigger: 'Done',
// },




const TestPage = () => {

  const steps = [
    {
      id: 'Greet',
      message: 'Hello, welcome to our site Wuemela!',
      trigger: 'Done',
    },
    {
      id: 'Done',
      message: 'Please enter your name.',
      trigger: 'waiting1',
    },
    {
      id: 'waiting1',
      user: true,
      trigger: 'Name',
    },
    {
      id: 'Name',
      message: 'Hi {previousValue}, please select your issue:',
      trigger: 'issues',
    },
    {
      id: 'issues',
      options: [
        {
          value: 'Services',
          label: 'Services',
          trigger: 'Services',
        },
        {
          value: 'Jobs',
          label: 'Jobs',
          trigger: 'Jobs',
        },
      ],
    },
    {
      id: 'Services',
      message:
        'Thanks for letting us know about Services issue. There are many services on our site quick recruiter you can navigate to know more information.',
      end: true,
    },
    {
      id: 'Jobs',
      message:
        'Thanks for letting us know about Jobs issue. There are many jobs on our site quick recruiter you can navigate to know more information.',
      end: true,
    },
  ];

  const chatbotStyle = {
    minWidth: '400px',
    maxWidth: '800px',
    minHeight: '400px',
    maxHeight: '600px',
    margin: 'auto',
  };

  return (
    <div className="bg-white">
      <iframe width="350" height="430" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/34d23a13-50ef-4f94-9290-aa783ecad823"></iframe>

      <Segment style={chatbotStyle}>
        <ChatBot
          steps={steps}
          userAvatar={
            'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png'
          }
          botAvatar={
            'https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png'
          }
          botDelay={1000}
          floating={true}
          headerTitle="Chatbot"
          width={'40%'}
          style={{ boxShadow: '0px 0px 15px #9E9E9E' }}
        />
      </Segment>
    </div>
  );
}

export default TestPage;
