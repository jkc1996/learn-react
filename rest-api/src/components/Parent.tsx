import React, { useState } from 'react'
import Child from './Child';

function Parent() {
//   const [activeTab, setActiveTab] = useState<string>("");
//   const handleSelect = (tabId: string) => {
//     setActiveTab(tabId);
//   };

  const [message, setMessage] = useState("");

  const handleReceive = (data: string) => {
    setMessage(data);
  };

  return (

    // Below one is example where child is not doing anything, it is just informing parent that something happened.
    // now wht to do next is up to the parent.
    // <div>
    //    <h3>Active Tab: {activeTab}</h3>
        
    //     <Child
    //     label="Tab 1"
    //     onSelect={() => handleSelect("Tab-1")}
    //     />

    //     <Child
    //     label="Tab 2"
    //     onSelect={() => handleSelect("Tab-2")}
    //     />

    //     <Child
    //     label="Tab 3"
    //     onSelect={() => handleSelect("Tab-3")}
    //     />
    // </div>

    <>
      <Child onSend={handleReceive} />
      <h3>Received: {message}</h3>
    </>
    )
}

export default Parent
