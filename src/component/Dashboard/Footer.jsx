import "../../style/Footer.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="about">
          <h1>About</h1>
          <p>
            RedBank is a dedicated blood donation platform designed to make a
            lifesaving difference. Our innovative website offers real-time
            features, such as live requests for blood donations from nearby
            users, ensuring quick responses when its needed the most. Whether
            your in search of a donor or wish to contribute, RedBank connects
            those in need with willing donors. Explore our platforms all
            Requests section to stay informed about ongoing campaigns, making it
            easier than ever to give the gift of life.
          </p>
          <div className="dev">
            <p>Developed by : Aamir Indi</p>
            <div className="social">
              <a href="https://github.com/aamirindi">
                <GitHubIcon />
              </a>
              <a href="https://www.linkedin.com/in/mohd-aamir-indi/">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
