import React from 'react'
import Editor from 'react-simple-wysiwyg';
function Description({description , setDescription} : {
    description: string;
    setDescription: (description: string) => void;
}) {
  return (
    <div>
        <Editor value={description} onChange={(e)=>setDescription(e.target.value)} />
    </div>
  )
}

export default Description