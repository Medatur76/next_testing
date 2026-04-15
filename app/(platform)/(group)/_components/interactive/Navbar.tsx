export default function Navbar(options: {volunteer?: boolean}) {
    return (
    <nav className="row border-bottom">
        <div className="row left">
          <img src={"./icon.png"} />
          <div className="row buttons">
            <div>Classroom</div>
            <div>Sessions</div>
            {options.volunteer ? <div>Volunteer Portal</div> : null}
          </div>
        </div>
        <div className="row right">
          <div className="buttons">
            <div className="feedback_button">Feedback</div>
            <div className="session_button">Schedule Session</div>
          </div>
          <div className="profile" />
        </div>
      </nav>
    )
}