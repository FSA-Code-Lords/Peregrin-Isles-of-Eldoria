import githubThumbnail from "../images/githubThumbnail.png";
import linkedinThumbnail from "../images/linkedinThumbnail.png";

const Footerbar = () => {
  return (
    <>
      <div id="footerbar-container">
        {/* <div id="copyrightBar" align="center">
          &copy; 2023 PIE Team 
        </div> */}
        <div id="gitBar">
          <div>
            <span>Loulian Liu</span>
            <a href="https://github.com/loulian444" target="blank">
              <img src={githubThumbnail} className="imageThumbnail"></img>
            </a> 
            <a href="https://www.linkedin.com/in/loulianliu/" target="blank">
            <img src={linkedinThumbnail} className="imageThumbnail"></img>
            </a>
          </div>      
          <div>
            <span>Edward Jacobian</span>
            <a href="https://github.com/edjacobian" target="blank">
              <img src={githubThumbnail} className="imageThumbnail"></img>
            </a> 
            <a href="https://www.linkedin.com/in/edward-jacobian-5a31456b" target="blank">
            <img src={linkedinThumbnail} className="imageThumbnail"></img>
            </a>
          </div> 
          <div>
            <span>James Gauvreau</span>
            <a href="https://github.com/JamesGauvreau" target="blank">
              <img src={githubThumbnail} className="imageThumbnail"></img>
            </a> 
            <a href="https://www.linkedin.com/in/james-gauvreau" target="blank">
            <img src={linkedinThumbnail} className="imageThumbnail"></img>
            </a>
          </div>    
        </div>
      </div>
    </>
  );
};

export default Footerbar;
