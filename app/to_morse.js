const morse = {
    " ":" ",
    "'":".----.",
    "(":"-.--.-",
    ")":"-.--.-",
    ",":"--..--",
    "-":"-....-",
    ".":".-.-.-",
    "/":"-..-.",
    "0":"-----",
    "1":".----",
    "2":"..---",
    "3":"...--",
    "4":"....-",
    "5":".....",
    "6":"-....",
    "7":"--...",
    "8":"---..",
    "9":"----.",
    ":":"---...",
    ";":"-.-.-.",
    "?":"..--..",
    "A":".-",
    "B":"-...",
    "C":"-.-.",
    "D":"-..",
    "E":".",
    "F":"..-.",
    "G":"--.",
    "H":"....",
    "I":"..",
    "J":".---",
    "K":"-.-",
    "L":".-..",
    "M":"--",
    "N":"-.",
    "O":"---",
    "P":".--.",
    "Q":"--.-",
    "R":".-.",
    "S":"...",
    "T":"-",
    "U":"..-",
    "V":"...-",
    "W":".--",
    "X":"-..-",
    "Y":"-.--",
    "Z":"--..",
    "_":"..--.-"
  }

  function to_morse(user_input){
      var result = "";
      var counter = 0;
      for(counter = 0; counter < user_input.length; counter++){
          result += morse.user_input.toUpperCase();
      }
      return result;
  }

  function to_audio(user_input){

  }

  function to_light(user_input){

  }