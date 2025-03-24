import React from 'react'


function ChatBot() {

    window.watsonAssistantChatOptions = {
        integrationID: "b231a9ec-46c5-4d45-bba6-33d37f2d25cb", // The ID of this integration.
        region: "au-syd", // The region your integration is hosted in.
        serviceInstanceID: "9d5130ca-226a-4492-b67a-5da12b79d265", // The ID of your service instance.
        onLoad: async (instance) => { await instance.render(); }
      };
      setTimeout(function(){
        const t=document.createElement('script');
        t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
        document.head.appendChild(t);
      });
  return (
    <div className='hidden'></div> //hidden div
  )
}

export default ChatBot
