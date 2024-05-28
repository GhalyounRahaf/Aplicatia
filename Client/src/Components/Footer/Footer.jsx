// import Footer.Css................
import './Footer.css'

// import Footerdata................
import { FootersLinksData } from '../../Data/Data'

// IMport Link From React Router DOm..........
import { Link } from 'react-router-dom'



export default function Footer() {
  return (
    <footer>
      <div className="container footer-container">
         {/* ............About Params.......... */}
         <div>
          <h4>About Us</h4>
          <ul className="about-params param-links">
            {
              FootersLinksData.Aboutus.map(({link, linkname}, index)=>{
                return(
                  <li key={index}><Link to={link}>{linkname}</Link></li>
                )
              })
            }
          </ul>
         </div>
         {/* ............Discover Params.......... */}
         <div>
          <h4>Discover</h4>
          <ul className="discoveParams param-links">
            {
              FootersLinksData.Discover.map(({link, linkname}, index)=>{
                return(
                  <li key={index}><Link to={link}>{linkname}</Link></li>
                )
              })
            }
          </ul>
         </div>
         {/* ............My account Params.......... */}
         <div>
          <h4>My Account</h4>
          <ul className="myAccount-params param-links">
            {
              FootersLinksData.Myaccount.map(({link, linkname}, index)=>{
                return(
                  <li key={index}><Link to={link}>{linkname}</Link></li>
                )
              })
            }
          </ul>
         </div>
         {/* ............Helps Params.......... */}
         <div>
          <h4>Helps</h4>
          <ul className="Helps-params param-links">
            {
              FootersLinksData.Help.map(({link, linkname}, index)=>{
                return(
                  <li key={index}><Link to={link}>{linkname}</Link></li>
                )
              })
            }
          </ul>
         </div>        
      </div>
    
    </footer>
  )
}
