import React, { useEffect } from "react";
import classes from "./usersList.module.css";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getUsersList } from "../store/usersListSlice";
import CloseIcon from "@material-ui/icons/Close";
import Done from "@material-ui/icons/Done";
import Loader from "./../components/Loader";
import Message from "./../components/Message";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteUser } from "../store/userDeleteSlice";

const UsersList = () => {
  // Hooks
  const dispatch = useDispatch();
  const history = useHistory();

  // usersList from redux
  const usersList = useSelector((state) => state.usersList);
  const { users, loading, error } = usersList;
  console.log(users);

  //userInfo
  const userLogin = useSelector((state) => state.user.userLogin);
  const { userInfo } = userLogin;

  //userDeleteState
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  //getting the users list from the backend and updating it in the redux state
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUsersList());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, successDelete]);

  //   user delete handler
  const userDeleteHandler = (userId) => {
    //   deleting the user
    dispatch(deleteUser(userId));
  };

  return (
    <div className={classes.usersListContainer}>
      <div className={classes.usersListTableContainer}>
        <span className={classes.title}>Users</span>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Table style={{ marginTop: "2rem" }} striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a
                      style={{ textDecoration: "none", color: "black" }}
                      href={`mailTo:${user.email}`}
                    >
                      {user.email}
                    </a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <Done style={{ color: "green" }} />
                    ) : (
                      <CloseIcon style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <Link to={`/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <EditIcon />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => userDeleteHandler(user._id)}
                      className="btn-sm"
                      variant="danger"
                    >
                      <DeleteIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default UsersList;
