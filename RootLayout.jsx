import { useState, useEffect } from "react";
import { Form, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Logo from "./components/Logo";

export default function RootLayout() {
  const [user, setUser] = useState(useLoaderData());
  const [diaCntx, setDiaCntx] = useState("login");
  // null
  console.dir(user);
  console.dir(diaCntx);
  console.dir(window.location);

  const navi = useNavigate()
  const actionData = useActionData();
  // undefined
  console.dir(actionData);

  useEffect(() => {
    console.log("HOME USEFFECT");
    if (actionData?.username) {
      setUser(actionData);
      sessionStorage.setItem("ReactCorePlayer", JSON.stringify(actionData));
      userDialog.close();
      navi('/core')
    }
    if (actionData?.errors) {
      console.dir(Object.keys(actionData.errors));
      let erroredInputNames = Object.keys(actionData.errors);
      // let form = document.querySelector('form:not');
      // console.dir(form);
      erroredInputNames.forEach(input => {
        let inp = document.querySelector(`[name=${input}]`);
        console.dir(inp);
        inp.value = "";
        inp.classList.add('erroredField');
        inp.placeholder = actionData.errors[input].message;
      })
      // document.querySelector(`${actionData.errors[0].path}`);
      // console.dir(erroredInput);
    }
  }, [actionData]);

  const handleDialog = (e) => {
    setDiaCntx(e.target.value);
    if(diaCntx != 'login'){
      userDialog.show();
    }
  };

  const signUpForm = (
    <Form method="post" id="userForm">
      <input
        name="username"
        id="regUsername"
        type="text"
        placeholder="Username"
      />
      <input
        name="password"
        id="password1"
        type="text"
        placeholder="Password"
      />
      <input name="email" id="email" type="email" placeholder="@ email" />
      <input
        name="passwordConfirm"
        id="password2"
        type="password"
        placeholder="Re-enter Password"
        autoComplete="false"
      />
      <select name="reLocale" id="reLocale">
        <option value="">Choose Location</option>
        <option value="USA">USA</option>
        <option value="Japan">Japan</option>
        <option value="Europe">Europe</option>
      </select>
      <div className="btn-flex form-btns">
        <button type="submit" className="confirm" name="intent" value="signUp">
          Sign Up
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => userForm.reset()}
        >
          Reset
        </button>
        <button
          type="button"
          className="cancel"
          onClick={(e) => {
            userForm.reset();
            userDialog.close();
          }}
        >
          Cancel
        </button>
      </div>
    </Form>
  );

  const gameForm = (
    <Form method="post" id="gameMakeForm">
      <select name="reLocale" id="reLocale">
        <option value="USA">USA</option>
        <option value="Japan">Japan</option>
        <option value="Europe">Europe</option>
      </select>
      <input hidden name="userId" defaultValue={user?._id} />
      <input
        name="reName"
        id="reName"
        type="text"
        placeholder="Name your Reactor"
      />
      <div className="btn-flex">
        <button type="submit" className="confirm" name="intent" value="newGame">
          Start
        </button>
        <button
          type="close"
          className="cancel"
          onClick={(e) => {
            gameMakeForm.reset();
            userDialog.close();
          }}
        >
          Cancel
        </button>
      </div>
    </Form>
  );

  const savedGames = (
    <article id="games">
      {user && (
        <div id="savedGames">
          {user.games.map((g) => (
            <div key={g._id} id={g.name} className="gameContainer">
              <h3 className="gameName">{g.name}</h3>
              <p className="times">
                <span className="created">Created: {g.created}</span>
                <span className="updated">Updated: {g.updated}</span>
              </p>
              <div className="btn-flex">
                <button
                  type="button"
                  className="secondary"
                  onClick={() => playGame(g)}
                >
                  Play
                </button>
                <button
                  type="button"
                  className="cancel"
                  onClick={"deleteGame Function"}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );

  return (
    <>
      <header>
        {user ? (
          <>
            <div id="playerInfo">
              <div id="playerDetails">
                <h1>{user?.username}</h1>
              </div>
              <div className="btn-flex">
                {Window.location == '/' &&
                <button
                type="button"
                value="gameForm"
                onClick={handleDialog}
                className="confirm"
                >
                  New Game
                </button>
                }
                <button
                  type="button"
                  className="secondary"
                  value="savedGames"
                  onClick={handleDialog}
                >
                  Saved Games
                </button>
                <button
                  type="button"
                  className="cancel"
                  onClick={() => {
                    sessionStorage.removeItem("ReactCorePlayer");
                    setUser(null);
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <article name='login' id="login">
            <Form method="POST" id="loginForm">
              <div className="btn-flex-clm">
                <input
                  name="lUsername"
                  id="username"
                  type="text"
                  placeholder="Username"
                />
                <input
                  name="lPassword"
                  id="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="false"
                />
              </div>
              <div className="btn-flex" id="registration">
                <button
                  type="submit"
                  className="confirm"
                  name="intent"
                  value="login"
                  onClick={handleDialog}
                >
                  Login
                </button>
                <button
                  id="register"
                  type="button"
                  name="intent"
                  value="signUpForm"
                  onClick={handleDialog}
                >
                  Register
                </button>
              </div>
            </Form>
          </article>
        )}
        <dialog id="userDialog">
          {diaCntx == "signUpForm"
            ? signUpForm
            : diaCntx == "gameForm"
            ? gameForm
            : diaCntx == "savedGames"
            ? savedGames
            : "NO FORM CONTEXT"}
        </dialog>
      </header>
      <Outlet context={{ user, setUser }} />
    </>
  );
}
