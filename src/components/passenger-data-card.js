import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { utils } from "../helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PassengerDataCard(props) {
  const classes = useStyles();

  const passenger = props.passenger ? props.passenger : null;

  let title = "-";
  let initials = "-";
  let subTitle = "-";
  let description = "-";

  if (passenger) {
    if (passenger.name) {
      title = passenger.name;
      initials = utils.getStringInitials(passenger.name);
    }
    if (passenger.airline) {
      if (passenger.airline.length > 0) {
        const airline = passenger.airline[0];
        subTitle = airline.name ? airline.name : "-";
        description = airline.slogan ? airline.slogan : "-";
      } else {
        subTitle = passenger.airline.name ? passenger.airline.name : "-";
        description = passenger.airline.slogan ? passenger.airline.slogan : "-";
      }
    }
  }

  return (
    <Card
      className={classes.root}
      key={props.key}
      onMouseOver={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {initials}
          </Avatar>
        }
        title={title}
        subheader={subTitle}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        <Typography variant="h6" color="textSecondary" component="p">
          {props.index + 1}
        </Typography>
      </CardContent>
    </Card>
  );
}
