import "./Album.css"
export function Album({Name,imgArray,})
{
    return(<div className="Album">
           <h1>{Name}</h1>
           <p>
            {imgArray.map((e)=>
            <img src={e}></img>
            )}
           </p>
    </div>)
}