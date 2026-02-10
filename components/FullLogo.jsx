import "/public/style/logo.css";

export default function FullLogo() {
  return (
    <main className="pic">
      <div id="whole-logo">
        <div className="reactor">
          <h1 className="radioactive">
            <span className="front">
              <span className="accent">c</span>R
            </span>
            <span className="mid">eact</span>
            <span className="end">
              or
              <span className="accent">d</span>
            </span>
          </h1>
        </div>
        <div id="coreW">
          <label className="core">
            C<img src="/images/react-new.png" alt="" id="O" />
            RE
          </label>
          <label className="accent" id="bolt">
            i
          </label>
        </div>
      </div>
    </main>
  );
}
