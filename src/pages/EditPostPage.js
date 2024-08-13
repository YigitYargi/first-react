import { useEffect, useState ,useContext} from "react";
import { formatISO, formatISO9075,format } from 'date-fns';
import { UserContext } from "../UserContext";
import {Link} from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import { Navigate,useParams} from "react-router-dom";

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  };
  
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];
  



  export default  function EditPostPage() {
    
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files,setFiles] = useState('');
    const [redirect,setRedirect] = useState(false);
   
    

    useEffect(() => {

  
        fetch(`http://localhost:4000/post/`+id)
        .then(response => {
          response.json().then(postInfo => {
            setTitle(postInfo.title);
            setContent(postInfo.content);
            setSummary(postInfo.summary);
        });
    
        }) ;
    
    }, [id] );
       
    
    
    
   async function editPost(ev) {
ev.preventDefault();

const data = new FormData();


 data.set('title',title);
 data.set('summary',summary);
 data.set('content',content);
 data.set('id',id);
  
 if(files?.[0]) {

 data.set('file',files?.[0]);
 }


const response = await fetch('http://localhost:4000/post', {

method:'PUT',
body: data,
credentials:'include',
});

if(response.ok) {

  window.location.href = `/post/${id}`;
  //setRedirect(true);
 
 }

 
}
    
async function deletePost() {
  
  const confirmation = window.confirm("Are you sure you want to delete this post?");
   
  if (confirmation) {
  const response = await fetch(`http://localhost:4000/post/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  
  if (response.ok) {
    
    window.location.href = '/';
    //setRedirect(true);
  }

}
}





return (

      <form onSubmit={editPost}>
      
      <input type ="title" 
            placeholder={'Title'} 
           value={title} 
           onChange={ev => setTitle(ev.target.value)}/>
      
      <input type ="summary" 
             placeholder={'Summary'}
             value={summary} 
             onChange={ev => setSummary(ev.target.value)}/>
      
      
      <input type ="file" 
             onChange={ev => setFiles(ev.target.files)}
       />
      
      <ReactQuill value ={content}
                  theme={'snow'}
                  onChange={newValue => setContent(newValue)}
                  modules={modules} 
                  formats={formats}/>
      
      
      <div className="edit-buttons">
      
      <button  className="edit" style={{marginTop:'5px'}}>Edit post</button>
      
      <button className="delete" onClick={deletePost} style={{ marginTop: '5px'}}>Delete post</button>
  
      </div>
      
      </form>
      
);



}

