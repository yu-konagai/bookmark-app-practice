export{};
const form         =document.getElementById("bookmark-form") as HTMLFormElement;
const titleInput   =document.getElementById("title") as HTMLInputElement;
const urlInput     = document.getElementById("url")  as HTMLInputElement;
const tagsInput    = document.getElementById("tags") as HTMLInputElement;
const memoTextArea = document.getElementById("memo") as HTMLTextAreaElement;
const bookmarkList = document.getElementById("bookmark-list") as HTMLDivElement;
const searchInput  = document.getElementById("search") as HTMLInputElement;
type Bookmark={
    id:number;
    title:string;
    url:string;
    tags:string[];
    memo:string;
    isFavorite:boolean;
}
let Bookmarks:Bookmark[]=[];
let editId:number|null=null;

function saveBookmarks(){
    localStorage.setItem("Bookmarks",
        JSON.stringify(Bookmarks));
}
const savedBookmarks=localStorage.getItem("Bookmarks");
if(savedBookmarks){
    Bookmarks=JSON.parse(savedBookmarks);
}

form.addEventListener("submit",(event)=>{
    event.preventDefault();

    if(editId!==null){
        Bookmarks=Bookmarks.map((item)=>{

        if(editId===item.id){
            item.title=titleInput.value;
            item.url=urlInput.value;
            item.tags=tagsInput.value.split(",").map(tag =>tag.trim());
            item.memo=memoTextArea.value;
            editId=null;
        return item 
        }else{return item }
        
    });
    }else{
    const title=titleInput.value;
    const url  =urlInput.value;
    const memo =memoTextArea.value;
    const tags =tagsInput.value.split(",").map((tag)=>{
        return tag.trim();
        })

        const NewBookmark:Bookmark={
        id:Date.now(),
        title:title,
        url:url,
        tags:tags,
        memo:memo,
        isFavorite:false,
    }
    Bookmarks.push(NewBookmark);
    }
    titleInput.value="";
    urlInput.value  ="";
    tagsInput.value ="";
    memoTextArea.value="";
    renderBookmark()
    saveBookmarks();
})


function renderBookmark(displayBookmarks:Bookmark[]=Bookmarks){
    bookmarkList.innerHTML=""
    displayBookmarks.forEach((Bookmark)=>{

    
       
     
        const div=document.createElement("div")
        div.innerHTML=`
        <h3>${Bookmark.title}</h3>
        <a href="${Bookmark.url}"target="_blank">${Bookmark.url}</a>
        <p>${Bookmark.memo}</p>
        `;
       
        Bookmark.tags.forEach((tag)=>{
        const tagsSpan = document.createElement("Span");
        tagsSpan.textContent=`#${tag}`;
        tagsSpan.addEventListener("click",()=>{
        
            const tagsFilter=Bookmarks.filter((Bookmark)=>{
            return Bookmark.tags.includes(tag);
            })
            renderBookmark(tagsFilter);
         })
          div.appendChild(tagsSpan);
        })
        
        const deleteButton = document.createElement("Button");
        deleteButton.textContent="削除"
        deleteButton.addEventListener("click",()=>{
            Bookmarks=Bookmarks.filter((item)=>{
                return item.id!==Bookmark.id
            })
            renderBookmark();
            saveBookmarks();
        })
        div.appendChild(deleteButton);
        
        bookmarkList.appendChild(div);
        
        
        const editButton = document.createElement("button");
        editButton.textContent="編集";
        editButton.addEventListener("click",()=>{
            titleInput.value=Bookmark.title;
            urlInput.value  =Bookmark.url;
            tagsInput.value =Bookmark.tags.join(",");
            memoTextArea.value=Bookmark.memo;
            editId=Bookmark.id;
        });
        div.appendChild(editButton)

        const favoriteButton=document.createElement("button");
        if(Bookmark.isFavorite===true){
             favoriteButton.textContent="★お気に入り";
        }else{ favoriteButton.textContent="☆お気に入り"; }
        favoriteButton.addEventListener("click",()=>{
            Bookmark.isFavorite=!Bookmark.isFavorite;
            renderBookmark();
            saveBookmarks();
        })
        div.appendChild(favoriteButton)
    })

    }
    searchInput.addEventListener("input",()=>{
        const keyword=searchInput.value;
        const searchFilterBookmarks=Bookmarks.filter((item)=>{
            return item.title.includes(keyword)
        })
        renderBookmark(searchFilterBookmarks);

    })
    renderBookmark();
