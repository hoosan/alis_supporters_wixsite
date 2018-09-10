// For full API documentation, including code examples, visit http://wix.to/94BuAAs
import {session} from 'wix-storage';
import wixWindow from 'wix-window';
session.clear();

$w.onReady(function () {

  $w("#html1").onMessage((event)=>{
    let i = event.data.id
    if(i < 18){
      let items = $w("Image");
      items[i].src = event.data.images[0]
      items[i].link = event.data.url
      if( items[i].collapsed ) {
        items[i].expand();
      }
    }
    let id = session.getItem("id")
    // console.log(id)
    if (id === null){
      session.setItem("id", "0");
    }
    else{
      let num = Number(id)
      num++
      session.setItem("id", num)
    }
    session.setItem("image"+id, event.data.images[0])
    session.setItem("url"+id, event.data.url)
    session.setItem("page", 0)
    session.setItem("maxId", id)
    $w("#html3").hide()

  })

  $w("#html2").onMessage((event)=>{
    let currentPage = session.getItem("page")
    let maxId = session.getItem("maxId")
    currentPage = Number(currentPage) + 1
    maxId = Number(maxId)
    // console.log(currentPage)
    // console.log(maxId)

    let remains = maxId - currentPage*18
    let startId = currentPage*18

    let items = $w("Image");
    let i;
    // for (i = 0; i < Math.min(remains, 18); i++){
    for (i = 0; i < 18; i++){
      let id = startId + i
      let iImage = i + 1
      // console.log(`id : ${id}`)
      if (maxId >= id){
        let src = session.getItem("image"+id)
        let link = session.getItem("url"+id)
        // items[i].src = src
        // items[i].link = link
        $w("#image"+iImage).src = src
        $w("#image"+iImage).link = link
      }
      else{
        $w("#image"+iImage).collapse();
      }
    }
    session.setItem("page", currentPage)
    $w("#html3").show()
    if (remains <= 18){
      $w("#html2").hide()
    }
    wixWindow.scrollTo(0, 0);

  })

  $w("#html3").onMessage((event)=>{
    let currentPage = session.getItem("page")
    let maxId = session.getItem("maxId")
    currentPage = Number(currentPage) - 1
    maxId = Number(maxId)
    // console.log(currentPage)
    // console.log(maxId)

    let remains = maxId - currentPage*18
    let startId = currentPage*18

    let i;
    // for (i = 0; i < Math.min(remains, 18); i++){
    for (i = 0; i < 18; i++){
      let id = startId + i
      // console.log(`id : ${id}`)
      let src = session.getItem("image"+id)
      let link = session.getItem("url"+id)
      // items[i].src = src
      // items[i].link = link
      let iImage = i + 1
      $w("#image"+iImage).src = src
      $w("#image"+iImage).link = link

      if( $w("#image"+iImage).collapsed ) {
        $w("#image"+iImage).expand();
      }
    }
    session.setItem("page", currentPage)
    $w("#html2").show()
    if (currentPage === 0){
      $w("#html3").hide()
    }
    wixWindow.scrollTo(0, 0);

  })
  
})

