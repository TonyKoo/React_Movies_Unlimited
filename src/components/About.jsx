import React from "react";
import PageHeader from "./pagecomponents/PageHeader";

function About() {
  return (
    <div className="main-content">
      <PageHeader header_text="About Us" />
      <p>
        Movie's Unlimited is an application to help you discover and save the
        movies you love, we hope you enjoy using it as much as we loved creating
        it.
      </p>
      <p>
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </p>
      <p className="about-logo">
        <a href="https://www.themoviedb.org/">
          <img src="./images/tmdblogo.png" alt="tmdb logo" />
        </a>
      </p>
    </div>
  );
}

export default About;
