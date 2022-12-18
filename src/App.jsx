import { useEffect, useState } from "react";
import "./App.css";
import emailjs from "emailjs-com";
import Login from "./components/Login/Login";
import PeopleList from "./components/PeopleList/PeopleList";

function App() {
  const [loginName, setLoginName] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [santaList, setSantaList] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );
  const [pname, setPname] = useState("");
  const [pemail, setPemail] = useState("");
  const [filteredSantaList, setFilteredSantaList] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );

  const login = () => {
    if (!loginName || !loginPass) {
      alert("Enter name and password to login");
    } else {
      if (loginName === "SecretSanta" && loginPass === "MA192022") {
        setLoggedIn(true);
        setLoginName("");
        setLoginPass("");
      } else {
        alert("Invalid Login");
      }
    }
  };

  const logout = () => {
    setLoggedIn(false);
  };

  const addPeople = (e) => {
    if (pname === "" || pemail === "") {
      alert("Please enter name and address");
    } else {
      const newValue = {
        id: new Date().getTime(),
        name: pname,
        email: pemail,
      };
      setSantaList([...santaList, newValue]);
      setFilteredSantaList([...filteredSantaList, newValue]);
      setPname("");
      setPemail("");
    }
  };

  const removePeople = (e) => {
    const newList = santaList.filter(
      (list) => e.target.parentElement.id != list.id
    );
    setFilteredSantaList([...newList]);
    setSantaList([...newList]);
  };

  const submitSanta = (e) => {
    e.preventDefault();
    if (filteredSantaList.length % 2 !== 0) {
      alert(
        "You must have an even number of names. You currently have " +
          filteredSantaList.length +
          " names."
      );
    } else {
      var arr1 = filteredSantaList.slice(), // copy array
        arr2 = filteredSantaList.slice(); // copy array again

      arr1.sort(function () {
        return 0.5 - Math.random();
      }); // shuffle arrays
      arr2.sort(function () {
        return 0.5 - Math.random();
      });

      const randomPair = [];

      while (arr1.length) {
        let name1 = arr1.pop();
        let name2 = arr2[0] === name1 ? arr2.pop() : arr2.shift();
        let pair = { sender: name1, reciever: name2 };
        randomPair.push(pair);
        console.log(name1.name + " gets " + name2.name);
      }
      for (var i = 0; i < randomPair.length; i++) {
        var emailInfo = {
          user_name: randomPair[i].sender.name,
          message: randomPair[i].reciever.name,
          user_email: randomPair[i].sender.email,
        };
        emailjs
          .send(
            "service_lqfh8i3",
            "template_e0zt1va",
            emailInfo,
            "r8sPxSBQfIlOImo0h"
          )
          .then(
            function (response) {
              console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
              alert("Error: An email was entered incorrectly!");
              console.log("FAILED...", error);
            }
          );
      }
    }
    console.log("sent");
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(filteredSantaList));
  }, [filteredSantaList]);

  return (
    <div className='App'>
      {loggedIn ? (
        <>
          <PeopleList
            submitSanta={submitSanta}
            filteredSantaList={filteredSantaList}
            setPname={setPname}
            setPemail={setPemail}
            removePeople={removePeople}
            pname={pname}
            pemail={pemail}
            addPeople={addPeople}
            logout={logout}
          />
        </>
      ) : (
        <>
          <Login
            loginName={loginName}
            loginPass={loginPass}
            login={login}
            setLoginName={setLoginName}
            setLoginPass={setLoginPass}
          />
        </>
      )}
    </div>
  );
}

export default App;
