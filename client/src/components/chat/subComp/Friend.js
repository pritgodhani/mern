import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
// import WorkIcon from "@material-ui/icons/Work";
// import BeachAccessIcon from "@material-ui/icons/BeachAccess";
// import Divider from "@material-ui/core/Divider";
export default function Friend() {
  return (
    <div>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        {/* <Divider variant="inset" component="li" /> */}
      </List>
    </div>
  );
}
