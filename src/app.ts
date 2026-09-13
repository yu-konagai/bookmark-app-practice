const form         =document.getElementById("bookmark-form") as HTMLFormElement;
const titleInput   =document.getElementById("title") as HTMLInputElement;
const urlInput     = document.getElementById("url")  as HTMLInputElement;
const tagsInput    = document.getElementById("tags") as HTMLInputElement;
const memoTextArea = document.getElementById("memo") as HTMLTextAreaElement;
const bookmarkList = document.getElementById("bookmark-list") as HTMLDivElement;
type Bookmark={
    id:number;
    title:string;
    url:string;
    tags:string[];
    memo:string;
    isFavorite:boolean;
}
let Bookmarks:Bookmark[]=[];

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const title=titleInput.value;
    const url  =urlInput.value;
    const memo =memoTextArea.value;
    const tags =tagsInput.value.split(",").map((tag)=>{
        return tag.trim();
    
    });
    

    const NewBookmark:Bookmark={
        id:Date.now(),
        title:title,
        url:url,
        tags:tags,
        memo:memo,
        isFavorite:false,
    }
    Bookmarks.push(NewBookmark);
    titleInput.value="";
    urlInput.value  ="";
    tagsInput.value ="";
    memoTextArea.value="";
    renderBookmark()

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
        })
        div.appendChild(deleteButton);
        
        bookmarkList.appendChild(div);
        });
        
    }
