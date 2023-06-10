import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { EditMovie } from '../../api-helpers/api-helpers'; // Import the EditMovie function from your API helpers file

const MovieForm = ({ movie }) => {
  const [open, setOpen] = React.useState(false);
  const [movieData, setMovieData] = React.useState({
    title: '',
    language: '',
    description: '',
    file: null,
  });
  const [errors, setErrors] = React.useState({
    title: '',
    language: '',
    description: '',
    file: '',
  });

  React.useEffect(() => {
    setMovieData({
      title: movie.title,
      language: movie.language,
      description: movie.description,
      file: null,
    });
  }, [movie]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setMovieData({ ...movieData, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setMovieData({ ...movieData, file: event.target.files[0] });
  };

  const validateInputs = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      language: '',
      description: '',
      file: '',
    };

    if (!movieData.title) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!movieData.language) {
      newErrors.language = 'Language is required';
      isValid = false;
    }

    if (!movieData.description) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!movieData.file) {
      newErrors.file = 'File is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleEditMovie = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      // Call the EditMovie API helper function
      const response = await EditMovie(movie.id, movieData, movieData.file);
      console.log('Movie edited successfully:', response);

      // Reset form fields and close the dialog
      setMovieData({
        title: '',
        language: '',
        description: '',
        file: null,
      });
      setErrors({
        title: '',
        language: '',
        description: '',
        file: '',
      });
      handleClose();
    } catch (error) {
      console.error('Failed to edit movie:', error);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} style={{ border: 'none', color: 'white' }}>
        <b>EDIT </b>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>EDIT MOVIE</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Movie Title"
            type="text"
            fullWidth
            variant="standard"
            value={movieData.title}
            onChange={handleInputChange}
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            autoFocus
            margin="dense"
            id="language"
            name="language"
            label="Language"
            type="text"
            fullWidth
            variant="standard"
            value={movieData.language}
            onChange={handleInputChange}
            error={!!errors.language}
            helperText={errors.language}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={movieData.description}
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            autoFocus
            margin="dense"
            id="file"
            name="file"
            label="Select File"
            type="file"
            fullWidth
            variant="standard"
            onChange={handleFileChange}
            error={!!errors.file}
            helperText={errors.file}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditMovie}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieForm;
