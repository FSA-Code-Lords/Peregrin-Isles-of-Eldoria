import githubThumbnail from "../images/githubThumbnail.png";
import linkedinThumbnail from "../images/linkedinThumbnail.png";

const Footerbar = () => {
  return (
    <>
      <div id="footerbar">
        {/* <div id="copyrightBar" align="center">
          &copy; 2023 PIE Team 
        </div> */}
        <div id="gitBar">
          <div>
            <p>Loulian Liu</p>
            <a href="https://github.com/loulian444" target="blank">
              <img src={githubThumbnail} className="imageThumbnail"></img>
            </a> 
            <a href="https://www.linkedin.com/in/loulianliu/" target="blank">
            <img src={linkedinThumbnail} className="imageThumbnail"></img>
            </a>
          </div>      
          <div>
            <p>Edward Jacobian</p>
            <a href="https://github.com/edjacobian" target="blank">
              <img src={githubThumbnail} className="imageThumbnail"></img>
            </a> 
            <a href="linkedin" target="blank">
            <img src={linkedinThumbnail} className="imageThumbnail"></img>
            </a>
          </div> 
          <div>
            <p>James Gauvreau</p>
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
