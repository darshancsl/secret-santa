import React from "react";
import "./PeopleList.css";

const PeopleList = ({
  submitSanta,
  filteredSantaList,
  setPname,
  setPemail,
  removePeople,
  pname,
  pemail,
  addPeople,
  logout,
}) => {
  return (
    <>
      <h1>Secret Santa</h1>
      <form onSubmit={submitSanta}>
        <ul className='main-list'>
          {filteredSantaList &&
            filteredSantaList.map(({ name, id, email }, i) => {
              return (
                <li
                  key={id}
                  id={id}
                  className='input-element d-flex align-center justify-center d-block-md'
                >
                  <div className='item id'>{i + 1}.</div>
                  <input
                    name='user_name'
                    defaultValue={name}
                    className='name'
                    placeholder='Name'
                    onChange={(e) => setPname(e.target.value)}
                  />
                  <input
                    name='user_email'
                    defaultValue={email}
                    className='email'
                    placeholder='Email'
                    onChange={(e) => setPemail(e.target.value)}
                  />
                  <button className='remove-btn' onClick={removePeople}>
                    Remove
                  </button>
                </li>
              );
            })}
        </ul>
        <div className='form-element d-flex align-center justify-center d-block-md'>
          <input
            type='text'
            placeholder='Enter name..'
            onChange={(e) => setPname(e.target.value)}
            value={pname}
          />
          <input
            type='email'
            placeholder='Enter email..'
            onChange={(e) => setPemail(e.target.value)}
            value={pemail}
          />
          <div>
            <button type='button' className='add-btn' onClick={addPeople}>
              Add
            </button>
            <button type='submit' className='submit-btn'>
              Submit
            </button>
          </div>
        </div>
      </form>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default PeopleList;
