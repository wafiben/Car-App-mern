import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    width: "40%",
    margin: "auto",
    marginTop: "50px",
    padding: "50px",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    padding: "10px",
    margin: "10px",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));
export default useStyles;
