import React from "react";
import { Link } from "react-router-dom";
import StyledDocument_Templates from "../styled/Document_Templates.styled";

const Document_Templates = () => {
  const documents = [
    {
      name: "CITY College Debriefing Form Template",
      url: "https://docs.google.com/document/d/1ajgrskrRESRaZaGgPclAy5_dtbCv2h1B/edit?usp=drive_link&ouid=103053912011531519099&rtpof=true&sd=true",
    },
    {
      name: "CITY College EEG Information Sheet Template",
      url: "https://docs.google.com/document/d/1D9N7t_OwIBlLGeqJdxo0cOtbaCwm2Oya/edit?usp=drive_link&ouid=103053912011531519099&rtpof=true&sd=true",
    },
    {
      name: "CITY College Ethics in Research Policy",
      url: "https://docs.google.com/document/d/1Tohdo-ekJbvUbiMugBYXvlUR43TURLP5/edit?usp=drive_link&ouid=103053912011531519099&rtpof=true&sd=true",
    },
    {
      name: "CITY College Parental Consent Form Template",
      url: "https://docs.google.com/document/d/1EAsSEiF3qzpNlUnfhIm7E3ofZojCQR3B/edit?usp=drive_link&ouid=103053912011531519099&rtpof=true&sd=true",
    },
    {
      name: "CITY College Parental Information Sheet Template",
      url: "https://docs.google.com/document/d/1BhXaOfw5Sr0nMp_GRqMbB6o9Qq5SpPJw/edit?usp=drive_link&ouid=103053912011531519099&rtpof=true&sd=true",
    },
    {
      name: "CITY College Participant Consent Form Template",
      url: "https://docs.google.com/document/d/1jF-oZuvRVvumak-XrXymJnkzZyIfVUc3/edit?usp=drive_link&ouid=103053912011531519099&rtpof=true&sd=true",
    },
    {
      name: "CITY College Participant Information Sheet Template",
      url: "https://docs.google.com/document/d/1PlBGcZugq3a__tqOePqhz6ZpBQfFrF7D/edit?usp=drive_link&ouid=103053912011531519099&rtpof=true&sd=true",
    },
  ];

  return (
    <>
      <StyledDocument_Templates>
        <h1>Document Templates</h1>
        <ul>
          {documents.map((document, index) => (
            <li key={index}>
              <div>
                {document.name}
                <Link to={document.url}>
                  <button className="btn">Open</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </StyledDocument_Templates>
    </>
  );
};

export default Document_Templates;