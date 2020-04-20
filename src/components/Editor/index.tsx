import React, {useState, useRef} from 'react';
import JoditEditor from "jodit-react";

const Example = ({}) => {
	const editor = useRef(null)
	const [content, setContent] = useState('')
	
	const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}
	console.log('content ', content);
	return (
            <JoditEditor
            	ref={editor}
                value={content}
                config={config}
		        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => {}}
            />
        );
}

export default Example;