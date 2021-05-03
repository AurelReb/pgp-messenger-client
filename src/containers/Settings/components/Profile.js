import React, { useEffect} from "react";
import Button from "@material-ui/core/Button";
import {
  useDispatch,
  useSelector,
  getUserProfile,
} from "../../../config/store";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";


function Profile() {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profile.username) {
      dispatch(getUserProfile());}
    let user = profile.username
  });
  return (
    <div>
        <h1> {profile.username}</h1>
    </div>
  );
}

export default Profile;
