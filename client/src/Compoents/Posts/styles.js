import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Container: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row", 
    justifyContent: "space-between",
     alignItems: "center", 
    padding: "10px 50px",
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
}));
export default useStyles;
