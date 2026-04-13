export default function Teacher() {
  return (
    <>
      <nav>
        <div className="left">
          <img src={"./icon.png"} />
          <div className="buttons">
            <div>Instructor Chat</div>
            <div>Sessions</div>
            <div>Volunteer Portal</div>
          </div>
        </div>
        <div className="right">
          <div className="buttons">
            <div className="feedback_button">Feedback</div>
            <div className="session_button">Schedule Session</div>
          </div>
          <div className="profile" />
        </div>
      </nav>
      <header>
        <div>
          <div>
            <div>Upcomming Session</div>
            <a>Schedule New</a>
          </div>
        </div>
      </header>
      <div></div>
    </>
  )
}