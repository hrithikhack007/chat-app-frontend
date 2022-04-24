import React from "react";

const CurrentUsers = ({ users }) => {
  // cons

  return (
    <>
      <div className="roomUsersList">
        {users.map((user) => (
          <div className="roomUser">{user.user}</div>
        ))}
      </div>
    </>
  );
};

export default CurrentUsers;
