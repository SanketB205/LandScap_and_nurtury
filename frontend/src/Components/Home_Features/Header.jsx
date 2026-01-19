import './Header.css'

export function Header()
{
    return(<div className="Header">
        <div className='Name'> <h1>The Nurchers </h1></div>
       <div className="NavBar">
        <navabar>
            <a href='/'> Home </a>
            <a href='/gallaries'> Gallries </a>
            <a href='/blog'> Blog </a>
            <a href='/aboutUs'> AboutUs </a>
        </navabar>
       </div>
    </div>);
}