// Format a timestamp, accepts the timestamp and options object as optional parameter
// const addDate = date => {
//     let dateString = date.toString();

//     // get last character in the date string
//     const lastCharacter = dateString.characterAt(dateString.length -1);
// }
module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
      
    },
};    