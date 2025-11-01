import React from 'react';
import ImgFooter from '../assets/images/image informatique/manette-ps4.jpg';

function Footer() {
    return (
    <footer className="footer-section">
      <div className="container relative">
        <div className="sofa-img">
          <img src={ImgFooter} alt="Sofa" className="img-fluid" />
        </div>
        <div className="border-top copyright">
          <div className="row pt-4">
            <div className="col-lg-6">
              <p className="mb-2 text-center text-lg-start">
                Copyright &copy;<script>document.write(new Date().getFullYear());</script>. All Rights Reserved. &mdash; Designed with love by <a href="https://untree.co">Untree.co</a> Distributed By <a href="https://themewagon.com">ThemeWagon</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
