import {useState,useEffect} from 'react'
import './App.css';
import Header from './components/header/Header.js'
import Post from './components/post/Post.js'
import {db} from './firebase.js'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button,Input} from '@material-ui/core'
function App() {
  const [posts, setPosts] = useState([
   
  ]);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
   db.collection('posts').onSnapshot(snapshot =>{
     setPosts(snapshot.docs.map(doc => (
       {
         id:doc.id,
         post:doc.data()
       }
     )));
   })
  }, []);

  return (
    <div className="app">
      <Header />
     <Button onClick={()=> setOpen(true)}>Sign up</Button>
   <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {    <div style={modalStyle} className={classes.paper}>
        
        
                <form className="app__signup">
    <center>
       <img
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        className="app__headerImage"
        alt="our logo"
      />
    
    </center>


    <Input type="text" className="custom-input" placeholder="username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
    <Input type="email" className="custom-input" placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
    <Input type="password" className="custom-input" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
    <Button className="custom-btn">Sign Up</Button>
    
        </form>
    </div>
}
      </Modal>

      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          imageUrl={post.imageUrl}
          caption={post.caption}
        />
      ))}
      {/* <Post username="ezekiel" caption="i am back guys" imageUrl="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />
      <Post username="dani" caption="my new vlog is out" imageUrl="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" />
      <Post username="hasham" caption="this my first post" imageUrl="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300" /> */}
    </div>
  );
}

export default App;
