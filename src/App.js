import "./App.css";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";
import { Update } from "@mui/icons-material";
/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "Center",
  color: theme.palette.text.secondary,
}));

const App = () => {
  const [show, setShow] = useState(true);
  const [saveButton, setSaveButton] = useState(true);
  const [showAlert, setAlert] = useState(false);
  const [showAlertError, setAlertError] = useState(false);
  const [showAlertName, setAlertName] = useState(false);
  const [showAlertCategory, setAlertCategory] = useState(false);
  const [showAlertCount, setAlertCount] = useState(false);
  const [showAlertValue, setAlertValue] = useState(false);
  const [data, setData] = useState([]);
  const [idproduct, setIdProduct] = useState(0);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);

  const onNameChange = (event) => setName(event.target.value);
  const onCategoryChange = (event) => setCategory(event.target.value);
  const onCountChange = (event) => setCount(event.target.value);
  const onValueChange = (event) => setValue(event.target.value);

  const getData = async () => {
    try {
      const { data: response } = await axios.get(
        "http://localhost:3030/products"
      );
      setData(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();

    validateErrorName();
    validateErrorCategory();
    validateErrorCount();
    validateErrorValue();
  }, [name, category, count, value]);

  const validateErrorName = () => {
    if (name.length > 0) {
      setAlertName(false);
    }
  };

  const validateErrorCategory = () => {
    if (category.length > 0) {
      setAlertCategory(false);
    }
  };

  const validateErrorCount = () => {
    if (count > 0) {
      setAlertCount(false);
    }
  };

  const validateErrorValue = () => {
    if (value > 0) {
      setAlertValue(false);
    }
  };

  const showForm = () => {
    if (show) {
      setShow(false);
      saveButton(true);
    }
  };

  const cancel = () => {
    if (!show) {
      setName("");
      setCategory("");
      setCount(0);
      setValue(0);
      setShow(true);
      setAlert(false);
      setAlertError(false);
      setAlertError(false);
      setAlertName(false);
      setAlertCategory(false);
      setAlertCount(false);
      setAlertValue(false);
    }
  };

  const showTable = () => {
    if (name === "") {
      setAlertError(true);
      setAlertName(true);
      console.log("Debes llenar el campo name");
    }
    if (category === "") {
      setAlertError(true);
      setAlertCategory(true);
      console.log("Debes llenar el campo category");
    }
    if (count === 0) {
      setAlertError(true);
      setAlertCount(true);
      console.log("Debes llenar el campo count");
    }
    if (value === 0) {
      setAlertError(true);
      setAlertValue(true);
      console.log("Debes llenar el campo value");
    } else {
      axios
        .post("http://localhost:3030/addProduct", {
          productName: name,
          category: category,
          count: count,
          value: value,
        })
        .then((response) => {
          setName("");
          setCategory("");
          setCount(0);
          setValue(0);
          setShow(true);
          setAlert(true);
          setAlertError(false);
          getData();
          setAlertError(false);
          setAlertName(false);
          setAlertCategory(false);
          setAlertCount(false);
          setAlertValue(false);
          console.log(response);
        })
        .cathc((error) => {
          console.log(error);
        });
    }
  };

  const showData = (object) => {
    setSaveButton(false);
    setIdProduct(object.idproduct);
    setName(object.productName);
    setCategory(object.category);
    setCount(object.count);
    setValue(object.Value);
    setShow(false);
  };

  const update = () => {
    if (name === "") {
      setAlertError(true);
      setAlertName(true);
      console.log("Debes llenar el campo name");
      return;
    }
    if (category === "") {
      setAlertError(true);
      setAlertCategory(true);
      console.log("Debes llenar el campo category");
      return;
    }
    if (count < 1) {
      setAlertError(true);
      setAlertCount(true);
      console.log("Debes llenar el campo count");
      return;
    }
    if (value < 1) {
      setAlertError(true);
      setAlertValue(true);
      console.log("Debes llenar el campo value");
      return; 
    } else {
      axios
        .put(`http://localhost:3030/update/${idproduct}`, {
          productName: name,
          category: category,
          count: count,
          value: value,
        })
        .then(() => {
          setName("");
          setCategory("");
          setCount(0);
          setValue(0);
          setShow(true);
          setAlert(true);
          setAlertError(false);
          setAlertError(false);
          setAlertName(false);
          setAlertCategory(false);
          setAlertCount(false);
          setAlertValue(false);
          getData();
        });
    }
  };

  return (
    <Box
      sx={{
        width: 1000,
        height: 300,
        p: 2,
        ml: 12,
        flexGrow: 3,
        backgroundColor: "#D4D4D4",
      }}
    >
      {show && (
        <Grid container spacing={2}>
          {showAlert && (
            <Grid item xs={10} sx={{ mb: 2 }}>
              <Alert value={showAlert} variant="filled" severity="success">
                El producto se creo correctamente
              </Alert>
            </Grid>
          )}
          <Grid item xs={8}>
            <Button
              onClick={() => {
                showForm();
              }}
              variant="contained"
              color="success"
            >
              Agregar
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500, pl: 2 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id Product</TableCell>
                    <TableCell align="left">Nombre</TableCell>
                    <TableCell align="left">Categoria</TableCell>
                    <TableCell align="left">Cantidad</TableCell>
                    <TableCell align="left">Valor</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow
                      key={row.name}
                      onClick={() => showData(row)}
                      sx={{ "&:last-child td, 8:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.idproduct}
                      </TableCell>
                      <TableCell align="left">{row.productName}</TableCell>
                      <TableCell align="left">{row.category}</TableCell>
                      <TableCell align="left">{row.count}</TableCell>
                      <TableCell align="left">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
      {!show && (
        <Box
          component="form"
          noValidate
          autoComplete="off"
          justifyContent="center"
        >
          {
            //showAlertError &&
            <Grid container spacing={2}></Grid>
          }
          <Grid sx={{ mt: 12 }} container justifyContent="center">
            {showAlertError && (
              <Grid item xs={10} sx={{ mb: 2 }}>
                <Alert value={showAlertError} variant="filled" severity="error">
                  Error: 'Existen campos vacios'.
                </Alert>
              </Grid>
            )}
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                error={showAlertName}
                onChange={onNameChange}
                value={name}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Categoria"
                variant="outlined"
                error={showAlertCategory}
                onChange={onCategoryChange}
                value={category}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Cantidad"
                variant="outlined"
                error={showAlertCount}
                onChange={onCountChange}
                value={count}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Valor"
                variant="outlined"
                error={showAlertValue}
                onChange={onValueChange}
                value={value}
              />
            </Grid>
          </Grid>
          <Grid sx={{ mt: 6 }} container justifyContent="center">
            <Grid item sx={{ mr: 2 }}>
              <Button
                onClick={() => {
                  cancel();
                }}
                variant="contained"
                color="error"
              >
                Cancelar
              </Button>
            </Grid>
            {saveButton && (
              <Grid item>
                <Button
                  onClick={() => {
                    showTable();
                  }}
                  variant="contained"
                  color="success"
                >
                  Guardar
                </Button>
              </Grid>
            )}
            {!saveButton && (
              <Grid item>
                <Button
                  onClick={() => {
                    update();
                  }}
                  variant="contained"
                  color="success"
                >
                  Actualizar
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default App;
