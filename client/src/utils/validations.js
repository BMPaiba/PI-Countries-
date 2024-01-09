export default function validations(input) {
    const exprName = /^[A-Za-z\s]+$/;
    const exprTiempo = /^([01]\d|2[0-3]):([0-5]\d)$/;
  
    let errors = {};
    if (input.name.length < 3 || input.name.length > 20)
      errors.name = "The name must have between 3 and 20 letters";
    if (!exprName.test(input.name))
      errors.name = "The name can only contain letters";
    if (!exprTiempo.test(input.duration))
      errors.duration = "Accepted format is HH:MM - Example: 01:30 / 00:45";
      if (input.difficulty==="Seleccionar" || input.difficulty===undefined  || input.difficulty===null | input.difficulty==="" ) {
          errors.difficulty = "Select difficulty";
        }
    if (input.season==="Seleccionar" || input.season===undefined  || input.season===null | input.season==="" ) {
      errors.season = "Select a station";
    }
    return errors;
  }
  
  