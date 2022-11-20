
//Credentials
const CLIENT_ID = '94d397db951549bbae0e8996e31aafc3';
const CLIENT_SECRET = '58037c60e9cd4e30b35cbd0eb09d49e9';
//Get access token

async function getToken(){
try{
  const url='https://accounts.spotify.com/api/token';
   const config={
    body: 'grant_type=client_credentials',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
    },
  };
  const response =await fetch(url,config);
  const data = await response.json();
      // token=data.access_token;
      // localStorage.setItem('token', data.access_token);
      return data.access_token;
    }
  catch(error){
  console.log(error);
}
};

getToken()
.then((response) =>{
  localStorage.setItem('token', response);
})
.catch((e) => {
  console.log(e);
});



async function getTrackData(query){
try{
  const url=`https://api.spotify.com/v1/search?q=${query}&type=track`;
  const config= {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
  };
   const response= await fetch(url,config);
   const data = await response.json()
  //  console.log(data);
   return data;
}
catch(err){
  console.log(err.status);
}
}


var searchuser=document.querySelector("#searchUser");
var submit=document.querySelector("#submit");

searchuser.addEventListener('keypress',(e)=>{
  if (e.key=="Enter"){
    e.preventDefault;
    playSong();    
  }
})

submit.addEventListener('click',(e)=>{
  if (e.key=="Enter"){
    e.preventDefault;
    playSong();    
  }
})



var songList = document.querySelector('#songlist');
var output = '';
function playSong(){
  getTrackData(searchuser.value)
  .then((res) => {
    let j= 0;
    res.tracks.items.forEach((i) => {    
      output += `
    <div class="list"> 
      <div class="item">
       <img class="thumbnail" src="${i.album.images[0].url}">
        <div>
           <p>${i.name}</p>
           <audio controls><source id="song" src="${i.preview_url}" type="audio/ogg"></audio>
        </div>
      </div>
   </div> 
 <div id="${j}" class="modal">
    <div class="modal-content">
        <img src="${i.album.images[0].url}">
            <p>${i.name}</p>
            <audio controls><source id="song" src="${i.preview_url}" type="audio/ogg"></audio>
            <div class="closs">Close
            </div>
    </div>
 </div>
<br>
`;
j++;
songList.innerHTML = output;
// songList.appendChild(list);
});
  })
  .catch((e) => {
    console.log(e.status);
  })
}
playSong();


// -----------modal----------
var songList = document.querySelector('#songlist');
songList.addEventListener('click',(e) => {
  if (e.target.nodeName == 'I') {
      var modal = document.getElementById(e.target.parentNode.parentNode.parentNode.nextSibling.id);
      var audio = e.target.parentNode.parentNode.parentNode.nextSibling.childNodes[0].childNodes[2];
      modal.style.display = "block";
      audio.play();
      var close = e.target.parentNode.parentNode.parentNode.nextSibling.childNodes[0].lastElementChild;
      close.addEventListener('click', () => {
          audio.pause();
          modal.style.display = "none";
      });
      window.onclick = function (event) {
          if (event.target == modal) {
              audio.pause();
              modal.style.display = "none";
          }
      }
  }
});






  //  const searchUser = document.getElementById('searchUser').addEventListener('click',data);



    //  var listcontent = document.getElementById('songlist');
    // //  const list = document.createElement("div");
    // //  list.className("list");
    // //  listcontent.appendChild(list);
    

    // items.forEach(element => {
    // // const songitem=document.createElement("div");
    // // songitem.className("item");
   
    // // const songimg = document.createElement("img");
    // // const songPlay = document.createElement("div ");
    // // songPlay.className("play");
    // // const playicon = document.createElement("span");
    // // playicon.className("fa fa-play");
    // // const songname = document.createElement("h4");
    // // songname.style.color = "#ffff";
    // // songimg.src = element.album.images[0].url;
    // // songname.innerHTML = element.name;
    // // song.setAttribute("src",element.preview_url);
    // // // listcontent.append(song.songPlay);
    // // list.append(songitem);
    // // songitem.append(song);
    // // songitem.append(songPlay);
    // // songitem.append(song.play());
    // // songitem.append(song.pause());
    // // songitem.append(playicon);
    // // songitem.append(songimg);
    // // songitem.append(songname); 

    //   const songname = document.createElement("h4");
    //   const songimg = document.createElement("img");
    //   const song = document.createElement("audio");
    //   songname.style.background = "#ffff";
    //   songimg.src = element.album.images[0].url;
    //   songname.innerHTML = element.name;
    //   song.setAttribute("src",element.preview_url); 
    //   const audio = new Audio( 'preview-url' );
    //   audio.play();
    //   audio.pause();
    //   listcontent.append(song.songPlay);
   
    //   listcontent.append(song);
    //   listcontent.append(song.play());
    //   listcontent.append(song.pause());
    //   listcontent.append(songimg);
    //   listcontent.append(songname);
    //  });     
  

  

//   // // //Audio Constructor
//   function Audioplay(url) {
//   const audio = new Audio(url);
  
//   audio.play();
//     // audio.pause();
//   }




