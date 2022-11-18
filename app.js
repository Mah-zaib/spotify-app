
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

var songList = document.querySelector('.songlist');
var output = '';
function playSong(){
  getTrackData('atif')
  .then((res) => {
    res.tracks.items.forEach((i) => {
      var list = document.createElement('div');
      list.className = 'list';
      output = `
      <img class="thumbnail" src="${i.album.images[0].url}">
      <audio controls>
  <source src="${i.preview_url}" type="audio/ogg">
  <source src="${i.preview_url}" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<br>
`;
list.innerHTML = output;
songList.appendChild(list);
    });
  })
  .catch((e) => {
    console.log(e.status);
  })
}

playSong();

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




